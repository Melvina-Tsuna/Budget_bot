import { useCallback, useEffect, useState } from 'react'
import { ensureSession, loginAnonymously, loginWithCredentials, logout } from '../services/auth'
import { createWallet, fetchWalletBalances } from '../services/wallets'
import { createExpense, createIncome, fetchRecentTransactions } from '../services/transactions'
import { toFriendlyMessage } from '../utils/errors'
import type { WalletBalance } from '../lib/supabase'
import type { AuthMode, LoginStatus, TransactionRecord, WalletType } from '../types'

const IDLE_LOGIN_STATUS: LoginStatus = { loading: false, message: null, error: null }
const IDLE_WALLET_FORM_STATUS = { loading: false, error: null as string | null }
const IDLE_TX_FORM_STATUS = { loading: false, error: null as string | null }

export function useBudgetApp() {
  const [wallets, setWallets] = useState<WalletBalance[]>([])
  const [transactions, setTransactions] = useState<TransactionRecord[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [authMode, setAuthMode] = useState<AuthMode>('anonyme')
  const [signedOut, setSignedOut] = useState(false)
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(IDLE_LOGIN_STATUS)
  const [walletFormStatus, setWalletFormStatus] = useState(IDLE_WALLET_FORM_STATUS)
  const [txFormStatus, setTxFormStatus] = useState(IDLE_TX_FORM_STATUS)

  const refreshWallets = () => fetchWalletBalances().then(setWallets)
  const refreshTransactions = () => fetchRecentTransactions().then(setTransactions)

  const loadAll = useCallback(async () => {
    try {
      const mode = await ensureSession()
      setAuthMode(mode)
      await Promise.all([refreshWallets(), refreshTransactions()])
      setError(null)
    } catch (e) {
      setError(toFriendlyMessage(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      await loadAll()
    })()
  }, [loadAll])

  const retry = () => {
    setLoading(true)
    loadAll()
  }

  const handleAnonymousLogin = async () => {
    setLoginStatus({ loading: true, message: null, error: null })
    try {
      await loginAnonymously()
      setAuthMode('anonyme')
      setSignedOut(false)
      await Promise.all([refreshWallets(), refreshTransactions()])
      setLoginStatus({ loading: false, message: 'Mode anonyme activé.', error: null })
    } catch (e) {
      setLoginStatus({ loading: false, message: null, error: toFriendlyMessage(e) })
    }
  }

  const handleUserLogin = async (email: string, password: string) => {
    setLoginStatus({ loading: true, message: null, error: null })
    try {
      const loggedInEmail = await loginWithCredentials(email, password)
      setAuthMode('utilisateur')
      setSignedOut(false)
      await Promise.all([refreshWallets(), refreshTransactions()])
      setLoginStatus({ loading: false, message: `Connecté en tant que ${loggedInEmail}`, error: null })
      return true
    } catch (e) {
      setLoginStatus({ loading: false, message: null, error: toFriendlyMessage(e) })
      return false
    }
  }

  const handleLogout = async () => {
    setLoginStatus({ loading: true, message: null, error: null })
    try {
      await logout()
      setWallets([])
      setTransactions([])
      setSignedOut(true)
      setLoginStatus(IDLE_LOGIN_STATUS)
    } catch (e) {
      setLoginStatus({ loading: false, message: null, error: toFriendlyMessage(e) })
    }
  }

  const addWallet = async (name: string, type: WalletType) => {
    setWalletFormStatus({ loading: true, error: null })
    try {
      await createWallet(name, type)
      await refreshWallets()
      setWalletFormStatus(IDLE_WALLET_FORM_STATUS)
      return true
    } catch (e) {
      setWalletFormStatus({ loading: false, error: toFriendlyMessage(e) })
      return false
    }
  }

  const addExpense = async (walletId: string, amount: number, category: string, description: string | null) => {
    setTxFormStatus({ loading: true, error: null })
    try {
      await createExpense({ walletId, amount, category, description })
      await Promise.all([refreshWallets(), refreshTransactions()])
      setTxFormStatus(IDLE_TX_FORM_STATUS)
      return true
    } catch (e) {
      setTxFormStatus({ loading: false, error: toFriendlyMessage(e) })
      return false
    }
  }

  const addIncome = async (walletId: string, amount: number, description: string | null) => {
    setTxFormStatus({ loading: true, error: null })
    try {
      await createIncome({ walletId, amount, description })
      await Promise.all([refreshWallets(), refreshTransactions()])
      setTxFormStatus(IDLE_TX_FORM_STATUS)
      return true
    } catch (e) {
      setTxFormStatus({ loading: false, error: toFriendlyMessage(e) })
      return false
    }
  }

  return {
    wallets,
    transactions,
    error,
    loading,
    authMode,
    signedOut,
    loginStatus,
    walletFormStatus,
    txFormStatus,
    retry,
    handleAnonymousLogin,
    handleUserLogin,
    handleLogout,
    addWallet,
    addExpense,
    addIncome,
  }
}
