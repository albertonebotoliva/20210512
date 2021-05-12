import { Router } from 'preact-router';
import Redirect from '../containers/redirect';
// Code-splitting is automated for `routes` directory
import GiveConsent from '../containers/giveConsent';
import CollectedConsents from '../containers/collectedConsents';

const App = () => (
	<div id="app">
		<Router>
			<Redirect path="/" to="/give-consent" />
			<GiveConsent path="/give-consent" />
			<CollectedConsents path="/collected-consent" />
		</Router>
	</div>
)

export default App;
