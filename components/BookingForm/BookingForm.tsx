'use client';

import { useBookingFormStore } from '@/store/bookingFormStore';
import { useEffect } from 'react';
import { BookingDatePicker } from '../BookingDatePicker/BookingDatePicker';
import styles from './BookingForm.module.css';
import toast from 'react-hot-toast';

export function BookingForm() {
  const { name, email, comment, startDate, setField, reset, hydrate } = useBookingFormStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.custom(
      <div className={styles.toast}>
        <div className={styles.toastContent}>
          <img src="/images/placeholder.png" className={styles.toastImage} />
          <div className={styles.toastMessage}>
            <StarIcon />
            <p className={styles.toastText}>Booking confirmed!</p>
            <StarIcon />
          </div>
        </div>
      </div>
    );

    reset();
  };

  function StarIcon() {
    return (
      <svg width="16" height="16" className={styles.starIcon}>
        <use href="/sprite/sprite.svg#icon-star" />
      </svg>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder="Name*"
          required
          className={styles.input}
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setField('email', e.target.value)}
          placeholder="Email*"
          required
          className={styles.input}
        />

                <BookingDatePicker selectedDate={startDate} 
  onDateChange={(date) => setField('startDate', date)}
/>

        <textarea
          value={comment}
          onChange={(e) => setField('comment', e.target.value)}
          placeholder="Comment"
          className={styles.textarea}
        />

        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
}
