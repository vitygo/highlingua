import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/authStore'
import { userApi } from '@/api/user'
import styles from './SettingsPage.module.css'

const AVATARS = [
  { id: 'lingo', src: '/characters/lingo.png', label: 'Lingo' },
  { id: 'memo', src: '/characters/memo.png', label: 'Memo' },
  { id: 'sparky', src: '/characters/sparky.png', label: 'Sparky' },
  { id: 'trophy', src: '/characters/trophy.png', label: 'Trophy' },
]

const profileSchema = z.object({
  name: z.string().min(2, 'Min 2 characters'),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Required'),
  newPassword: z.string().min(6, 'Min 6 characters'),
  confirmPassword: z.string().min(1, 'Required'),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ProfileForm = z.infer<typeof profileSchema>
type PasswordForm = z.infer<typeof passwordSchema>

export function SettingsPage() {
  const user = useAuthStore((s) => s.user)
  const updateUser = useAuthStore((s) => s.updateUser)
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar ?? 'lingo')
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? '' },
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  })

  const onProfileSubmit = async (data: ProfileForm) => {
    setSavingProfile(true)
    try {
      const res = await userApi.updateProfile({ name: data.name, avatar: selectedAvatar })
      updateUser({ name: res.user.name, avatar: res.user.avatar })
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  const onPasswordSubmit = async (data: PasswordForm) => {
    setSavingPassword(true)
    try {
      await userApi.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      toast.success('Password changed!')
      resetPassword()
    } catch {
      toast.error('Current password is incorrect')
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.sub}>Manage your profile</p>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Profile</h2>

        <div className={styles.avatarSection}>
          <p className={styles.label}>Choose avatar</p>
          <div className={styles.avatarGrid}>
            {AVATARS.map((av) => (
              <button
                key={av.id}
                className={`${styles.avatarOption} ${selectedAvatar === av.id ? styles.avatarSelected : ''}`}
                onClick={() => setSelectedAvatar(av.id)}
                type="button"
              >
                <img src={av.src} alt={av.label} />
                <span>{av.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              {...registerProfile('name')}
              className={styles.input}
              placeholder="Your name"
            />
            {profileErrors.name && (
              <span className={styles.error}>{profileErrors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              value={user?.email ?? ''}
              disabled
            />
          </div>

          <button
            type="submit"
            className={styles.saveBtn}
            disabled={savingProfile}
          >
            {savingProfile ? 'Saving...' : 'Save profile'}
          </button>
        </form>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Change password</h2>
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Current password</label>
            <input
              {...registerPassword('currentPassword')}
              type="password"
              className={styles.input}
              placeholder="••••••••"
            />
            {passwordErrors.currentPassword && (
              <span className={styles.error}>{passwordErrors.currentPassword.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>New password</label>
            <input
              {...registerPassword('newPassword')}
              type="password"
              className={styles.input}
              placeholder="••••••••"
            />
            {passwordErrors.newPassword && (
              <span className={styles.error}>{passwordErrors.newPassword.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Confirm new password</label>
            <input
              {...registerPassword('confirmPassword')}
              type="password"
              className={styles.input}
              placeholder="••••••••"
            />
            {passwordErrors.confirmPassword && (
              <span className={styles.error}>{passwordErrors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.saveBtn}
            disabled={savingPassword}
          >
            {savingPassword ? 'Changing...' : 'Change password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SettingsPage