"use client"

import {  FC, FormEventHandler, useState } from 'react' 
import { signIn } from 'next-auth/react'

interface pageProps {
 
}

const page: FC<pageProps> = ({}) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        signIn('credentials',{
          'username': username,
          'password': password,
          redirect:true,
          callbackUrl: 'http://localhost:8000/'
        })

    }
 return <>
    <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-4">Add new note</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="input input-bordered w-full"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn mt-3">
            Log in
          </button>
        </form>
 </>
}

export default page;