import React from 'react';
import './Header.css';
import { formatPhone } from '../../utils/formatPhone';

/*
Props: user {first_name, last_name, phone}, cartCount, wishlistCount, onNavigate, onToggleLang
*/
export default function Header({ user, cartCount=0, wishlistCount=0, onNavigate, onToggleLang }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo" onClick={()=>onNavigate && onNavigate('/')}>Wear&Go</div>
      </div>
    </header>
  );
}
