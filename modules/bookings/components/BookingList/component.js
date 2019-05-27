import React from 'react';
import { array } from 'prop-types';
import classNames from 'classnames';

import styles from './styles.css';

export default class Component extends React.PureComponent {
  static displayName = 'BookingsInfo';
  static propTypes = {
    list: array
  };

  formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${date.getFullYear()}`;
  }

  formatTextDate(date) {
    const month = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'][date.getMonth()];
    return `${month} ${date.getDate()} ${date.getFullYear()}`;
  }

  getTotalNights(booking) {
    // 86400000 = day in milliseconds
    // for whatever reason nights can be negative, setting minimum to 1
    return Math.max(
      Math.floor((+booking.dateDeparture - +booking.dateArrival) / 86400000),
      1
    );
  }

  getStatusClassname(status) {
    let classname = null;

    switch (status) {
      case 'Open':
        classname = styles.StatusOpen;
        break;
      case 'Booked':
        classname = styles.StatusBooked;
        break;
      case 'Unavailable':
        classname = styles.StatusUnavailable;
        break;
      case 'Tentative':
        classname = styles.StatusTentative;
        break;
      case 'Declined':
        classname = styles.StatusDeclined;
        break;
    }

    return classname;
  }

  getListItem(item) {
    return (
      <li className={styles.ListItem} key={item.propertyId}>

        <div className={styles.ListItemStatus}>
          <div className={classNames([styles.ListItemStatusIcon, this.getStatusClassname(item.status)])}>&#x25cf;</div>
          <div className={styles.ListItemStatusReplied}>

          </div>
        </div>

        <div className={styles.ListItemBody}>

          <div className={styles.ListItemHeader}>
            <div className={styles.ListItemName}>
              {item.guestName}
            </div>
            <div className={styles.ListItemDate}>
              {this.formatDate(item.dateCreated)}
            </div>
          </div>

          <div className={styles.ListItemDesc}>
            {item.propertyName}
          </div>

          <div className={styles.ListItemInfo}>
            {this.formatTextDate(item.dateArrival)},
            Nights: {this.getTotalNights(item)},
            Guests: {item.people}
          </div>

        </div>

      </li>
    );
  }

  render() {
    return (
      <>
      <ul className={styles.List}>
        {this.props.list.map(this.getListItem.bind(this))}
      </ul>
      </>
    );
  }
}