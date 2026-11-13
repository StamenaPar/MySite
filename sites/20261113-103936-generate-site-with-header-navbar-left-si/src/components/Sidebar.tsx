import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getItem, groups } from '../data';
import type { GroupId } from '../data';
import { ItemIcon } from '../icons';

interface SidebarProps {
  open: boolean;
}

type ExpandedState = Record<GroupId, boolean>;

export default function Sidebar({ open }: SidebarProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({ fruit: true, vegetables: true });
  const location = useLocation();

  // Make sure the group that contains the current page is visible.
  useEffect(() => {
    const match = location.pathname.match(/^\/item\/([^/]+)/);
    const current = match ? getItem(match[1]) : undefined;
    if (current) {
      setExpanded((prev) => (prev[current.group] ? prev : { ...prev, [current.group]: true }));
    }
  }, [location.pathname]);

  const toggle = (id: GroupId) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <nav id='sidebar' className={open ? 'sidebar open' : 'sidebar'} aria-label='Products'>
      <NavLink to='/' end className='nav-link nav-home'>
        <svg viewBox='0 0 24 24' width='22' height='22' aria-hidden='true' focusable='false'>
          <path d='M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z' fill='none' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
        </svg>
        <span>Overview</span>
      </NavLink>

      {groups.map((group) => {
        const isOpen = expanded[group.id];
        const listId = `group-${group.id}`;
        return (
          <div className='nav-group' key={group.id}>
            <button
              type='button'
              className='group-toggle'
              aria-expanded={isOpen}
              aria-controls={listId}
              onClick={() => toggle(group.id)}
            >
              <span>{group.name}</span>
              <svg
                className={isOpen ? 'chevron chevron-open' : 'chevron'}
                viewBox='0 0 24 24'
                width='18'
                height='18'
                aria-hidden='true'
                focusable='false'
              >
                <path d='M9 6l6 6-6 6' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
            <ul id={listId} className='group-list' hidden={!isOpen}>
              {group.itemIds.map((itemId) => {
                const item = getItem(itemId);
                if (!item) return null;
                return (
                  <li key={item.id}>
                    <NavLink to={`/item/${item.id}`} className='nav-link'>
                      <ItemIcon id={item.id} size={24} />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
