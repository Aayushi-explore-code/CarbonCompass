import React from 'react';
import { Compass, Bell, Settings, User, Leaf } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-surface/80 border-b border-surface-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-carbon-500 to-accent-teal flex items-center justify-center shadow-glow">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent-lime rounded-full border-2 border-surface animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                <span className="text-white">Carbon</span>
                <span className="gradient-text">Compass</span>
              </h1>
              <p className="text-[10px] text-gray-500 -mt-0.5 font-medium tracking-wider uppercase">
                Sustainability Dashboard
              </p>
            </div>
          </div>

          {/* Center Nav (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Dashboard', active: true },
              { label: 'Analytics', active: false },
              { label: 'Goals', active: false },
              { label: 'Reports', active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  item.active
                    ? 'bg-carbon-500/15 text-carbon-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-surface-elevated/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-surface-elevated/50 transition-all duration-300">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-emerald rounded-full" />
            </button>
            <button className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-surface-elevated/50 transition-all duration-300">
              <Settings className="w-4.5 h-4.5" />
            </button>
            <div className="ml-2 pl-3 border-l border-surface-border/40">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-elevated/50 hover:bg-surface-elevated transition-all duration-300 border border-surface-border/30">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-carbon-500 to-accent-teal flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-300 hidden sm:block">Ravi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
