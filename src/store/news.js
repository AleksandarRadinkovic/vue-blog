import Vue from 'vue';
import { GET_ALL_NEWS } from './actions';
import { SET_NEWS, SET_LOADING, SET_PAGE, SET_ERROR } from './mutations';

const state = {
  news: null,
  error: null,
  loading: false,
  page: 1,
};

const getters = {
  news(state) {
    return state.news;
  },
  error(state) {
    return state.error;
  },
  loading(state) {
    return state.loading;
  },
  page(state) {
    return state.page;
  },
}

const actions = {
  [GET_ALL_NEWS](context) {
    context.commit(SET_LOADING, true);
    return new Promise((resolve, reject) => {
      Vue.axios
        .get(
          'https://jsonplaceholder.typicode.com/posts'
        )
        .then(({ data }) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_NEWS, data);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_LOADING, false);
          context.commit(SET_ERROR, error);
          context.commit(SET_NEWS, []);
          reject(error);
        });
    });
  }
};

const mutations = {
  [SET_NEWS](state, news) {
    state.news = news;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_PAGE](state, page) {
    state.page = page;
  },
  [SET_ERROR](state, error) {
    state.error = error;
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};