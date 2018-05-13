import React from 'react';
import {Route, HashRouter as Router} from 'react-router-dom';
import Animate from 'rc-animate';
import routes from '../config/route';

const TRANSITION_LEFT = 'left';
const TRANSITION_RIGHT = 'right';

let transName = TRANSITION_LEFT;

export const transLeftAction = () => {
  transName = TRANSITION_LEFT;
};
export const transRightAction = () => {
  transName = TRANSITION_RIGHT;
};

const RouterCombiner = () => {
  const getRoutes = (props) => {
    const _Component = routes.filter(route => props.location.pathname === route.path);
    const Component = _Component.length > 0 ? _Component[0].component : () => <div
      className="EmptyComponent">{null}</div>;
    const AniComponent = () => (
      <div className="transition-content">
        <Component
          {...props}
          transLeftAction={transLeftAction}
          transRightAction={transRightAction}/>
      </div>
    );

    return (
      <div>
        <div className="transition-container">
          <Animate transitionName={transName} component="div">
            <Route
              location={props.location}
              key={props.location.pathname}
              path="*"
              component={AniComponent}/>
          </Animate>
        </div>
      </div>
    )
  };

  return (
    <Router>
      <Route render={getRoutes}/>
    </Router>
  );
};

export default RouterCombiner;
