import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Investor')
  const router = useRouter()

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } } // role-u metadata olaraq saxla
    })
    if (error) alert(error.message)
    else {
      alert('Registration successful!')
      router.push('/login')
    }
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 mb-2" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 mb-2" />
      <select onChange={e => setRole(e.target.value)} className="border p-2 mb-2">
        <option value="Investor">Investor</option>
        <option value="Startup">Startup</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleRegister} className="bg-blue-500 text-white p-2">Register</button>
    </div>
  )
}