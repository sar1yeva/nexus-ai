import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) alert(error.message)
    else {
      const role = data.user.user_metadata.role
      if (role === 'Investor') router.push('/dashboard/investor')
      if (role === 'Startup') router.push('/dashboard/startup')
      if (role === 'Admin') router.push('/dashboard/admin')
    }
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 mb-2" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 mb-2" />
      <button onClick={handleLogin} className="bg-green-500 text-white p-2">Login</button>
    </div>
  )
}