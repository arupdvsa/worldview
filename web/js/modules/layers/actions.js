import { findIndex as lodashFindIndex } from 'lodash';
import googleTagManager from 'googleTagManager';
import update from 'immutability-helper';
import {
  addLayer as addLayerSelector,
  resetLayers as resetLayersSelector,
  getLayers as getLayersSelector,
  getActiveLayers as getActiveLayersSelector,
  activateLayersForEventCategory as activateLayersForEventCategorySelector,
} from './selectors';
import {
  RESET_LAYERS,
  ADD_LAYER,
  INIT_SECOND_LAYER_GROUP,
  REORDER_LAYERS,
  REORDER_LAYER_GROUPS,
  ON_LAYER_HOVER,
  TOGGLE_LAYER_VISIBILITY,
  TOGGLE_LAYER_GROUPS,
  REMOVE_LAYER,
  UPDATE_OPACITY,
  ADD_LAYERS_FOR_EVENT,
} from './constants';
import { selectProduct } from '../data/actions';
import { updateRecentLayers } from '../product-picker/util';
import { getOverlayGroups } from './util';


export function resetLayers(activeString) {
  return (dispatch, getState) => {
    const { config } = getState();
    const newLayers = resetLayersSelector(
      config.defaults.startingLayers,
      config.layers,
    );
    dispatch({
      type: RESET_LAYERS,
      activeString,
      layers: newLayers,
    });
  };
}

export function initSecondLayerGroup() {
  return {
    type: INIT_SECOND_LAYER_GROUP,
  };
}

export function activateLayersForEventCategory(activeLayers) {
  return (dispatch, getState) => {
    const state = getState();
    const newLayers = activateLayersForEventCategorySelector(
      activeLayers,
      state,
    );
    dispatch({
      type: ADD_LAYERS_FOR_EVENT,
      activeString: state.compare.activeString,
      layers: newLayers,
    });
  };
}

export function toggleOverlayGroups() {
  return (dispatch, getState) => {
    const state = getState();
    const { activeString } = state.compare;
    const { groupOverlays, layers, overlayGroups } = state.layers[activeString];
    const getLayersFromGroups = (groups) => {
      const { overlays, baselayers } = getLayersSelector(layers, { group: 'all' }, state);
      return groups
        ? groups.flatMap((g) => g.layers.map((l) => overlays.find((o) => o.id === l.id))).concat(baselayers)
        : [];
    };

    // Disabling Groups
    if (groupOverlays) {
      dispatch({
        type: TOGGLE_LAYER_GROUPS,
        activeString,
        groupOverlays: false,
        layers: getLayersFromGroups(overlayGroups),
        overlayGroups: [],
      });

    // Enabling Groups
    } else {
      const groups = getOverlayGroups(layers);
      dispatch({
        type: TOGGLE_LAYER_GROUPS,
        groupOverlays: true,
        activeString,
        layers: getLayersFromGroups(groups),
        overlayGroups: groups,
      });
    }
  };
}

export function addLayer(id, spec = {}) {
  googleTagManager.pushEvent({
    event: 'layer_added',
    layers: { id },
  });
  return (dispatch, getState) => {
    const state = getState();
    const {
      layers, compare, proj, config,
    } = state;
    const layerObj = layers.layerConfig[id];
    const { groupOverlays } = layers[compare.activeString];
    const activeLayers = getActiveLayersSelector(state);
    const overlays = getLayersSelector(activeLayers, { group: 'overlays' }, state);
    const newLayers = addLayerSelector(
      id,
      spec,
      activeLayers,
      layers.layerConfig,
      overlays.length || 0,
      proj.id,
      groupOverlays,
    );
    const projections = Object.keys(config.projections);
    updateRecentLayers(layerObj, projections);
    dispatch({
      type: ADD_LAYER,
      id,
      activeString: compare.activeString,
      layers: newLayers,
    });
  };
}

export function reorderLayers(reorderedLayers) {
  return (dispatch, getState) => {
    const { compare } = getState();
    dispatch({
      type: REORDER_LAYERS,
      activeString: compare.activeString,
      layers: reorderedLayers,
      overlayGroups: getOverlayGroups(reorderedLayers),
    });
  };
}

export function reorderLayerGroups(layers, overlayGroups) {
  return (dispatch, getState) => {
    const { compare } = getState();
    dispatch({
      type: REORDER_LAYER_GROUPS,
      activeString: compare.activeString,
      layers,
      overlayGroups,
    });
  };
}

export function removeLayer(id) {
  return (dispatch, getState) => {
    const { compare, data } = getState();
    const { activeString } = compare;
    const activeLayers = getActiveLayersSelector(getState());
    const index = lodashFindIndex(activeLayers, { id });
    if (index === -1) {
      return console.warn(`Invalid layer ID: ${id}`);
    }
    const def = activeLayers[index];
    if (def.product && def.product === data.selectedProduct) {
      dispatch(selectProduct('')); // Clear selected Data product
    }
    dispatch({
      type: REMOVE_LAYER,
      id,
      activeString,
      def,
      layers: update(activeLayers, { $splice: [[index, 1]] }),
    });
  };
}

export function layerHover(id, isMouseOver) {
  return {
    type: ON_LAYER_HOVER,
    id,
    active: isMouseOver,
  };
}

export function toggleVisibility(id, visible) {
  return (dispatch, getState) => {
    const { compare } = getState();
    dispatch({
      type: TOGGLE_LAYER_VISIBILITY,
      id,
      visible,
      activeString: compare.activeString,
    });
  };
}

export function setOpacity(id, opacity) {
  return (dispatch, getState) => {
    const { compare } = getState();
    const activeLayers = getActiveLayersSelector(getState());
    const index = lodashFindIndex(activeLayers, { id });
    if (index === -1) {
      return console.warn(`Invalid layer ID: ${id}`);
    }
    dispatch({
      type: UPDATE_OPACITY,
      id,
      opacity: Number(opacity),
      activeString: compare.activeString,
    });
  };
}

export function clearGraticule() {
  return (dispatch) => {
    dispatch(toggleVisibility('Graticule', false));
  };
}

export function refreshGraticule() {
  return (dispatch) => {
    dispatch(toggleVisibility('Graticule', true));
  };
}
