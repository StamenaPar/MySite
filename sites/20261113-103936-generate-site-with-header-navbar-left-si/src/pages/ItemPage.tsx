import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice, getGroup, getItem } from '../data';
import { ItemIcon } from '../icons';
import NotFound from './NotFound';

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const item = getItem(id);

  useEffect(() => {
    if (item) document.title = `${item.name} - Fresh Market`;
  }, [item]);

  if (!item) {
    return <NotFound />;
  }

  const group = getGroup(item.group);

  return (
    <article className='page'>
      <nav className='breadcrumb' aria-label='Breadcrumb'>
        <Link to='/'>Overview</Link>
        <span aria-hidden='true'>/</span>
        <span>{group ? group.name : ''}</span>
        <span aria-hidden='true'>/</span>
        <span aria-current='page'>{item.name}</span>
      </nav>

      <div className='item-hero'>
        <div className='item-hero-icon'>
          <ItemIcon id={item.id} size={128} title={`${item.name} icon`} />
        </div>
        <div className='item-hero-text'>
          <p className='item-group'>{group ? group.name : ''}</p>
          <h1>{item.name}</h1>
          <p className='item-tagline'>{item.tagline}</p>
          <p className='item-price'>
            <span className='visually-hidden'>Price: </span>
            <strong>{formatPrice(item.price)}</strong> <span>{item.unit}</span>
          </p>
        </div>
      </div>

      <section className='panel' aria-labelledby='about-heading'>
        <h2 id='about-heading'>About</h2>
        <p>{item.description}</p>
      </section>

      <section className='panel' aria-labelledby='char-heading'>
        <h2 id='char-heading'>Characteristics</h2>
        <dl className='char-list'>
          {item.characteristics.map((c) => (
            <div className='char-row' key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.value}</dd>
            </div>
          ))}
          <div className='char-row'>
            <dt>Price</dt>
            <dd>
              {formatPrice(item.price)} {item.unit}
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
