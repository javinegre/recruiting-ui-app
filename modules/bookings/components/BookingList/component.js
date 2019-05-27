import React from 'react';
import { array } from 'prop-types';

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

  getListItem(item) {
    return (
      <li className={styles.ListItem} key={item.propertyId}>

        <div className={styles.ListItemStatus}>
          <div className={styles.ListItemStatusIcon}>&#x25cf;</div>
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
            Info
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