import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useLogin } from '@/features/auth'
import styles from './LoginPage.module.css'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
})

type FormData = z.infer<typeof schema>

export function LoginPage() {
  const { mutate: login, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData) => login(data)

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.mascot}>
          <img src="/characters/memo.png" alt="Lingo" />
        </div>
        <h1 className={styles.title}>Welcome back!</h1>
        <p className={styles.subtitle}>Log in to continue learning</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              {...register('email')}
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
              {...register('password')}
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
            {isPending ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage