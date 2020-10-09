/*
   Provides a single import location for font-awesome icons.  This allows us
   to simply import the FontAwesomeIcon component where we want to display
   an icon and only pass the string name of an icon.

   For example:
      import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
      <FontAwesomeIcon icon="times" fixedWidth />

  Icons that belong to a package other than '@fortawesome/free-solid-svg-icons'
  need to be defined as an array of strings where thee first element is the
  package abbreviation.  For example an icon from '@fortawesome/free-brands-svg-icons'
  becomes:
      <FontAwesomeIcon icon={['fab', 'facebook-f']} />

*/

import {
  faArrowCircleDown,
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowCircleUp,
  faArrowLeft,
  faArrowRight,
  faBan,
  faBolt,
  faCamera,
  faCaretDown,
  faCaretRight,
  faCheckCircle,
  faChevronCircleDown,
  faChevronCircleRight,
  faChevronDown,
  faChevronUp,
  faCircle,
  faClock,
  faCode,
  faDownload,
  faEnvelope,
  faExclamationCircle,
  faExclamationTriangle,
  faExternalLinkAlt,
  faFile,
  faFileVideo,
  faFilter,
  faFlag,
  faGift,
  faGlobeAmericas,
  faGlobeAsia,
  faHandPointer,
  faInfo,
  faInfoCircle,
  faLayerGroup,
  faMap,
  faMinus,
  faMeteor,
  faPause,
  faPlay,
  faPlus,
  faQuestionCircle,
  faRetweet,
  faRuler,
  faRulerCombined,
  faSatellite,
  faSearchLocation,
  faShareSquare,
  faSlidersH,
  faTimes,
  faTrash,
  faTruck,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
  faArrowCircleDown,
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowCircleUp,
  faArrowLeft,
  faArrowRight,
  faBan,
  faBolt,
  faCamera,
  faCaretDown,
  faCaretRight,
  faCheckCircle,
  faChevronCircleDown,
  faChevronCircleRight,
  faChevronDown,
  faChevronUp,
  faCircle,
  faClock,
  faCode,
  faDownload,
  faEnvelope,
  faExclamationCircle,
  faExclamationTriangle,
  faExternalLinkAlt,
  faEye,
  faEyeSlash,
  faFacebookF,
  faFile,
  faFileVideo,
  faFilter,
  faFlag,
  faGift,
  faGlobeAmericas,
  faGlobeAsia,
  faHandPointer,
  faInfo,
  faInfoCircle,
  faLayerGroup,
  faMap,
  faMinus,
  faMeteor,
  faPause,
  faPlay,
  faPlus,
  faQuestionCircle,
  faRetweet,
  faRedditAlien,
  faRuler,
  faRulerCombined,
  faSatellite,
  faSearchLocation,
  faShareSquare,
  faSlidersH,
  faTimes,
  faTrash,
  faTruck,
  faTwitter,
  faVideo,
);
