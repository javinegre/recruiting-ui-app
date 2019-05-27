import React from 'react';
import { func, bool, arrayOf, shape, string } from 'prop-types';

import BookingList from '../BookingList/component';

import CalendarLogo from '../../../../static/calendar.svg';
import styles from './styles.css';

export class Component extends React.PureComponent {
  static displayName = 'BookingsPage';
  static propTypes = {
    fetchBookings: func.isRequired,
    isLoading: bool,
    hasFailed: bool,
    data: arrayOf(shape({ guestName: string })),
  };

  componentDidMount() {
    this.props.fetchBookings();
  }

  render() {
    if (this.props.isLoading) return 'Loading…';
    if (this.props.hasFailed || !this.props.data) return 'Failed :(';

    return (
      <main className={styles.Main}>
        <BookingList list={this.props.data} />
        <section className={styles.BookingInfo}>
          <CalendarLogo />
          <h2 className={styles.BookingInfoTitle}>
            Reservation
          </h2>
          <p>
            Select any reservation item
          </p>
          <button className={styles.BtnOutline}>
            Create Booking
          </button>
          <button className={styles.BtnOutline}>
            Create Booking with Quote
          </button>
        </section>
      </main>
    );
  }
}
