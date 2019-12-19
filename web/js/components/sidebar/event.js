import React from 'react';
import PropTypes from 'prop-types';
import util from '../../util/util';
import lodashFind from 'lodash/find';
import googleTagManager from 'googleTagManager';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * Return date list for selected event
   */
  getDateLists() {
    const { event, isSelected, selectedDate } = this.props;
    if (event.geometry.coordinates.length > 1) {
      return (
        <ul
          className="dates"
          style={!isSelected ? { display: 'none' } : { display: 'block' }}
        >
          {event.geometries.map((geometry, index) => {
            var date = geometry.date.split('T')[0];
            return (
              <li key={event.properties.id + '-' + date} className="dates">
                <a
                  onClick={e => {
                    e.stopPropagation();
                    this.onClick(date);
                  }}
                  className={
                    selectedDate === date
                      ? 'date item-selected active'
                      : 'date item-selected '
                  }
                >
                  {date}
                </a>
              </li>
            );
          })}
        </ul>
      );
    }
  }

  /**
   *
   * @param {String} date | Date of event clicked
   * @param {Boolean} isSelected | Is this event already selected
   * @param {Object} e | Event Object
   */
  onClick(date) {
    const {
      selectEvent,
      event,
      deselectEvent,
      isSelected,
      selectedDate
    } = this.props;
    if (isSelected && (!date || date === selectedDate)) {
      deselectEvent();
    } else {
      selectEvent(event.properties.id, date);
      googleTagManager.pushEvent({
        event: 'natural_event_selected',
        natural_events: {
          category: event.properties.categories[0].title
        }
      });
    }
  }

  /**
   * Return reference list for an event
   */
  getReferenceList() {
    const { sources, event, isSelected } = this.props;
    if (!isSelected) return;

    const references = Array.isArray(event.sources)
      ? event.sources
      : [event.sources];
    if (references.length > 0) {
      return references.map(reference => {
        const source = lodashFind(sources, {
          id: reference.id
        });
        if (reference.url) {
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="natural-event-link"
              href={reference.url}
              key={event.properties.id + '-' + reference.id}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <i className="fa fa-external-link-alt fa-1" />{' '}
              {' ' + source.title}
            </a>
          );
        } else {
          return source.title + ' ';
        }
      });
    }
  }

  render() {
    const { event, isVisible, isSelected } = this.props;
    const eventDate = event.properties.date ? util.parseDateUTC(event.properties.date) : new Date();
    var dateString =
      util.giveWeekDay(eventDate) +
      ', ' +
      util.giveMonth(eventDate) +
      ' ' +
      eventDate.getUTCDate();
    if (eventDate.getUTCFullYear() !== util.today().getUTCFullYear()) {
      dateString += ', ' + eventDate.getUTCFullYear();
    }
    return (
      <li
        className={
          isSelected
            ? 'item-selected selectorItem item item-visible'
            : isVisible
              ? 'selectorItem item'
              : 'selectorItem item hidden'
        }
        onClick={e => {
          e.stopPropagation();
          this.onClick();
        }}
        id={'sidebar-event-' + util.encodeId(event.properties.id)}
      >
        <i
          className={'event-icon event-icon-' + event.properties.categories[0].slug}
          title={event.properties.categories[0].title}
        />
        <h4
          className="title"
          dangerouslySetInnerHTML={{
            __html: event.title + '<br />' + dateString
          }}
        />
        <p className="subtitle">{this.getReferenceList()}</p>

        {this.getDateLists()}
      </li>
    );
  }
}
Event.propTypes = {
  deselectEvent: PropTypes.func,
  event: PropTypes.object,
  isSelected: PropTypes.bool,
  isVisible: PropTypes.bool,
  selectedDate: PropTypes.string,
  selectEvent: PropTypes.func,
  sources: PropTypes.array
};

export default Event;
