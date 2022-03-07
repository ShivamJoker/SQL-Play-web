import React, { Suspense } from 'react';
const MobileNavigationComponent = React.lazy(() => import('./navigation'));

const MobileNavigation = () => {
  return (
    <Suspense fallback>
      <MobileNavigationComponent />
    </Suspense>
  )
}

export default MobileNavigation