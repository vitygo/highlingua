import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useRegister } from '@/features/auth'
import styles from './RegisterPage.module.css'

const schema = z.object({
  name: z.string().min(2, 'Min 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
})

type FormData = z.infer<typeof schema>

export function RegisterPage() {
  const { mutate: register, isPending } = useRegister()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData) => register(data)

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.mascot}>
          <img src="/characters/lingo.png" alt="Lingo" />
        </div>
        <h1 className={styles.title}>Join Highlingua!</h1>
        <p className={styles.subtitle}>Start learning for free</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              {...registerField('name')}
              type="text"
              placeholder="Your name"
              className={styles.input}
              disabled={isPending}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              {...registerField('email')}
              type="email"
              placeholder="you@example.com"
              className={styles.input}
              disabled={isPending}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              {...registerField('password')}
              type="password"
              placeholder="••••••••"
              className={styles.input}
              disabled={isPending}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.btn}
            disabled={isPending}
          >
            {isPending ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage