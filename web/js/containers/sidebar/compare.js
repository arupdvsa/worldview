import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import Layers from './layers';
import { getLayers } from '../../modules/layers/selectors';
import { toggleActiveCompareState } from '../../modules/compare/actions';
import util from '../../util/util';


const tabHeight = 32;
const CompareCase = (props) => {
  const {
    isActive,
    dateStringA,
    dateStringB,
    toggleActiveCompareState,
    isCompareA,
    height,
    layersA,
    layersB,
    checkerBoardPattern,
  } = props;

  const outerClass = 'layer-container sidebar-panel';
  const tabClasses = 'ab-tab';
  return (
    <div className={isActive ? '' : 'hidden '}>
      <div className={outerClass}>
        <div className="ab-tabs-case">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={
                    isCompareA
                      ? `${tabClasses} first-tab active`
                      : `${tabClasses} first-tab`
                  }
                onClick={toggleActiveCompareState}
              >
                <i className="productsIcon selected icon-layers" />
                {` A: ${dateStringA}`}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                    !isCompareA
                      ? `${tabClasses} second-tab active`
                      : `${tabClasses} second-tab`
                  }
                onClick={toggleActiveCompareState}
              >
                <i className="productsIcon selected icon-layers" />
                {` B: ${dateStringB}`}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={isCompareA ? '1' : '2'}>
            <TabPane tabId="1">
              <Layers
                isActive={isCompareA}
                activeOverlays={layersA}
                layerGroupName="active"
                height={height - tabHeight}
                checkerBoardPattern={checkerBoardPattern}
              />
            </TabPane>
            <TabPane tabId="2">
              <Layers
                isActive={!isCompareA}
                activeOverlays={layersB}
                layerGroupName="activeB"
                height={height - tabHeight}
                checkerBoardPattern={checkerBoardPattern}
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleActiveCompareState: () => {
    dispatch(toggleActiveCompareState());
  },
});
function mapStateToProps(state, ownProps) {
  const {
    layers, compare, date,
  } = state;


  return {
    isCompareA: compare.isCompareA,
    layersA: getLayers(layers.active, { group: 'all', proj: 'all' }, state),
    layersB: getLayers(layers.activeB, { group: 'all', proj: 'all' }, state),
    dateStringA: util.toISOStringDate(date.selected),
    dateStringB: util.toISOStringDate(date.selectedB),
    isActive: compare.active,
    height: ownProps.height,
  };
}
CompareCase.propTypes = {
  checkerBoardPattern: PropTypes.object,
  dateStringA: PropTypes.string,
  dateStringB: PropTypes.string,
  height: PropTypes.number,
  isActive: PropTypes.bool,
  isCompareA: PropTypes.bool,
  layersA: PropTypes.object,
  layersB: PropTypes.object,
  toggleActiveCompareState: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompareCase);
