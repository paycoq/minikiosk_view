import { createStore } from 'vuex';
import axios from 'axios';
import router from './assets/router';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
	state() {
		return {
			token: '',
			storeId: '2',
		};
	},
	mutations: {
		storeToken(state, token) {
			state.token = token;
		},
	},
	actions: {
		login(context, user) {
			axios
				.post(
					'http://ec2-3-36-49-133.ap-northeast-2.compute.amazonaws.com/auth',
					JSON.stringify({
						user_store_id: Number(user.userStoreId),
						user_password: user.userPassword,
					}),
					{
						headers: {
							'Content-Type': `application/json`,
						},
					},
				)
				.then((response) => {
					context.commit('storeToken', response.data.data.accessToken);
					router.push('/admin');
				})
				.catch((error) => {
					console.log(error);
				});
		},
		logout(context) {
			context.commit('storeToken', '');
			router.push('/');
		},
	},
	plugins: [createPersistedState()],
});

export default store;
