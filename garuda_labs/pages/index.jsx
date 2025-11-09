/*
Garuda Startup Website — Single-file React (Next.js) starter
File: pages/index.jsx

This file is a single-file landing page using React + Tailwind CSS.
Replace or split into components as you prefer.
*/

import React, { useState } from 'react'

export default function LandingPage(){
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

  async function handleSubscribe(e){
    e.preventDefault()
    if(!email) return setStatus('Please enter an email')
    setSending(true)
    try{
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
      })
      if(res.ok){
        setStatus('Thanks — you are on the list!')
        setEmail('')
      } else {
        const text = await res.text()
        setStatus(text || 'Signup failed — try again.')
      }
    }catch(err){
      setStatus('Network error — try later')
    }finally{
      setSending(false)
    }
  }

  async function handleContact(e){
    e.preventDefault()
    if(!email || !msg) return setStatus('Please enter email and message')
    setSending(true)
    try{
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, message: msg })
      })
      if(res.ok){
        setStatus('Message sent — we will reply soon')
        setEmail('')
        setMsg('')
      } else {
        const text = await res.text()
        setStatus(text || 'Send failed — try again')
      }
    }catch(err){
      setStatus('Network error — try later')
    }finally{
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-yellow-400 flex items-center justify-center text-white font-bold">G</div>
            <div>
              <h1 className="text-lg font-semibold">Garuda Labs</h1>
              <p className="text-xs text-gray-500">Adaptive Agents · Neuro-symbolic AI · Embodied Systems</p>
            </div>
          </div>
          <nav className="flex gap-6 items-center">
            <a href="#features" className="text-sm hover:underline">Features</a>
            <a href="#team" className="text-sm hover:underline">Team</a>
            <a href="#contact" className="text-sm hover:underline">Contact</a>
            <a href="/docs" className="text-sm px-3 py-2 bg-black text-white rounded">Docs</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">We engineer intelligent systems that learn and evolve like living beings.</h2>
            <p className="mt-6 text-lg text-gray-600">Merging AI, neuroscience and control engineering to create adaptive, autonomous machines — from simulation to real-world agents.</p>

            <div className="mt-8 flex gap-3">
              <a href="#contact" className="px-6 py-3 bg-black text-white rounded-md shadow">Get in touch</a>
              <a href="#features" className="px-6 py-3 border border-gray-300 rounded-md">Explore features</a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-semibold">Scale</h4>
                <p className="text-sm text-gray-500">From single-agent prototypes to fleet orchestration.</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-semibold">Safety</h4>
                <p className="text-sm text-gray-500">Neuro-symbolic overrides for robust, interpretable behavior.</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-semibold">Real-time</h4>
                <p className="text-sm text-gray-500">Online memory, rewiring, and low-latency control loops.</p>
              </div>
            </div>

          </div>

          <div className="bg-gradient-to-br from-white to-gray-100 rounded-lg p-6 shadow-inner">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold">Live demo (preview)</h3>
              <p className="text-sm text-gray-500 mt-2">Run the Garuda simulation in the cloud and watch an agent learn online. Connect via API to control parameters.</p>
              <div className="mt-4">
                <a className="inline-block px-4 py-2 bg-yellow-400 rounded font-medium" href="#">Launch demo</a>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium">Join our waitlist</h4>
              <form onSubmit={handleSubscribe} className="mt-3 flex gap-3">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 px-3 py-2 border rounded" />
                <button className="px-4 py-2 bg-black text-white rounded" disabled={sending}>{sending? '...' : 'Join'}</button>
              </form>
              {status && <p className="mt-2 text-sm text-green-600">{status}</p>}
            </div>
          </div>

        </section>

        <section id="features" className="mt-20">
          <h3 className="text-2xl font-bold">Core Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <FeatureCard title="Episodic Memory" desc="Online graph memory that stores events, chains, and multimodal contexts." />
            <FeatureCard title="Persona-driven Plasticity" desc="Different learning speeds and priorities per agent persona." />
            <FeatureCard title="Neuro-symbolic Control" desc="Hybrid system: learned policies with symbolic overrides for safety." />
          </div>
        </section>

        <section className="mt-20 bg-white p-8 rounded shadow-sm">
          <h3 className="text-2xl font-bold">How it works</h3>
          <ol className="mt-4 space-y-3 list-decimal list-inside text-gray-700">
            <li>Sensing: multi-modal vectors from the world (vision, audio, proprio).</li>
            <li>Encoding: cluster encoders produce learned embeddings.</li>
            <li>Memory retrieval: attention-based episodic graph lookup returns context.</li>
            <li>Decision: readout produces hybrid actions; symbolic layer can override.</li>
            <li>Learning: successful events create nodes; persona-weighted rewiring updates the network online.</li>
          </ol>
        </section>

        <section id="team" className="mt-20">
          <h3 className="text-2xl font-bold">Team</h3>
          <p className="mt-2 text-gray-600">Founders and collaborators</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <PersonCard name="Sudharsan M" title="Founder & CEO" bio="Electronics & Instrumentation engineer. Builds neuro-symbolic agents and drones." />
            <PersonCard name="CTO (placeholder)" title="CTO" bio="Systems architect for large-scale real-time systems." />
            <PersonCard name="Research Lead" title="Research Lead" bio="Neuroscience & RL specialist." />
          </div>
        </section>

        <section id="contact" className="mt-20 bg-gray-50 p-8 rounded">
          <h3 className="text-2xl font-bold">Contact & Demo requests</h3>
          <p className="text-gray-600 mt-2">We respond to investor, research partner and pilot requests.</p>

          <form onSubmit={handleContact} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="px-3 py-2 border rounded" />
            <input value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder="Short message" className="px-3 py-2 border rounded" />
            <div className="md:col-span-2 flex gap-3">
              <button className="px-4 py-2 bg-black text-white rounded" disabled={sending}>{sending? '...' : 'Send'}</button>
              <button type="button" onClick={()=>{setEmail(''); setMsg(''); setStatus(null)}} className="px-4 py-2 border rounded">Reset</button>
            </div>
            {status && <p className="md:col-span-2 text-sm text-green-600">{status}</p>}
          </form>
        </section>

        <footer className="mt-20 py-12 border-t text-sm text-gray-500">
          <div className="max-w-7xl mx-auto px-6 flex justify-between">
            <div>© {new Date().getFullYear()} Garuda Labs — All rights reserved</div>
            <div>Privacy · Terms · Docs</div>
          </div>
        </footer>

      </main>
    </div>
  )
}

function FeatureCard({title, desc}){
  return (
    <div className="p-6 bg-white rounded shadow-sm">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-600 mt-2">{desc}</p>
    </div>
  )
}

function PersonCard({name, title, bio}){
  return (
    <div className="p-4 bg-white rounded shadow-sm flex gap-4 items-center">
      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-sm text-gray-600 mt-1">{bio}</div>
      </div>
    </div>
  )
}
