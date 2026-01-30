import React from 'react'

export const CornerGradient = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-red-500/10 blur-[100px]" />

      <div className="absolute top-[80%] -right-[0%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-slate-100/30 blur-[100px] opacity-30" />
    </div>
  )
}
