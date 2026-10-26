import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { setUser, selectUser, selectAuthLoading } from '../store/authSlice'
import signUpArt from '../assets/signup-art.png'
import './SignUp.css'

const SILENT_ERRORS = new Set([
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
])

const ERROR_KEYS = {
  'auth/popup-blocked': 'auth.errors.popupBlocked',
  'auth/network-request-failed': 'auth.errors.network',
  'auth/unauthorized-domain': 'auth.errors.unauthorizedDomain',
  'auth/operation-not-allowed': 'auth.errors.notEnabled',
  'auth/user-disabled': 'auth.errors.userDisabled',
  'auth/too-many-requests': 'auth.errors.tooManyRequests',
  'auth/email-already-in-use': 'auth.errors.emailInUse',
  'auth/invalid-email': 'auth.errors.emailOnly',
  'auth/weak-password': 'auth.errors.weakPassword',
  'auth/invalid-credential': 'auth.errors.wrongCredentials',
  'auth/user-not-found': 'auth.errors.wrongCredentials',
  'auth/wrong-password': 'auth.errors.wrongCredentials',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SignUp = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const authLoading = useSelector(selectAuthLoading)
  const [mode, setMode] = useState('signup') // 'signup' | 'login'
  const [form, setForm] = useState({ name: '', login: '', password: '' })
  const [busy, setBusy] = useState(false)
  const [errorKey, setErrorKey] = useState('')

  if (user) return <Navigate to="/" replace />

  const isSignup = mode === 'signup'
  const disabled = busy || authLoading

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const switchMode = () => {
    setMode(isSignup ? 'login' : 'signup')
    setErrorKey('')
  }

  const handleError = (err) => {
    if (SILENT_ERRORS.has(err.code)) return
    console.error('Kirishda xatolik:', err)
    setErrorKey(ERROR_KEYS[err.code] ?? 'auth.errors.generic')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = form.login.trim()

    if (!EMAIL_RE.test(email)) {
      setErrorKey('auth.errors.emailOnly')
      return
    }

    setBusy(true)
    setErrorKey('')
    try {
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, email, form.password)
        const name = form.name.trim()
        if (name) {
          await updateProfile(cred.user, { displayName: name })
          // displayName yangilandi — Redux dagi user ni ham yangilaymiz
          dispatch(setUser(cred.user))
        }
      } else {
        await signInWithEmailAndPassword(auth, email, form.password)
      }
    } catch (err) {
      handleError(err)
    } finally {
      setBusy(false)
    }
  }

  const handleGoogle = async () => {
    setBusy(true)
    setErrorKey('')
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      handleError(err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="su-page">
      <div className="su-art">
        <img src={signUpArt} alt="" />
      </div>

      <div className="su-card">
        <h1>{isSignup ? t('auth.title') : t('auth.loginTitle')}</h1>
        <p className="su-subtitle">{t('auth.subtitle')}</p>

        <form className="su-form" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              className="su-field"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('auth.name')}
              aria-label={t('auth.name')}
              autoComplete="name"
              required
            />
          )}
          <input
            className="su-field"
            type="text"
            name="login"
            value={form.login}
            onChange={handleChange}
            placeholder={t('auth.emailOrPhone')}
            aria-label={t('auth.emailOrPhone')}
            autoComplete="username"
            required
          />
          <input
            className="su-field"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={t('auth.password')}
            aria-label={t('auth.password')}
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            minLength={6}
            required
          />

          <div className="su-actions">
            <button type="submit" className="su-submit" disabled={disabled} aria-busy={busy}>
              {busy ? t('auth.loading') : isSignup ? t('auth.createAccount') : t('auth.login')}
            </button>

            <button
              type="button"
              className="su-google"
              onClick={handleGoogle}
              disabled={disabled}
            >
              <FcGoogle />
              <span>{isSignup ? t('auth.google') : t('auth.googleLogin')}</span>
            </button>
          </div>
        </form>

        {errorKey && (
          <p className="su-error" role="alert">
            {t(errorKey)}
          </p>
        )}

        <p className="su-switch">
          <span>{isSignup ? t('auth.haveAccount') : t('auth.noAccount')}</span>
          <button type="button" onClick={switchMode}>
            {isSignup ? t('auth.login') : t('auth.signUpLink')}
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignUp
