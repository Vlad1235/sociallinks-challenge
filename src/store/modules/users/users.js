import {
    CHANGE_PAGE,
    CREATE_USER,
    DELETE_USER_BY_ID,
    GET_ALL_USERS,
    GET_ALL_USERS_BY_PAGE,
    HIDE_MODAL, SELECT_USER,
    SHOW_MODAL, UNSELECT_USER
} from "@/store/actions/users/users";
import api from '@/api/users/users'
import {toRaw} from "vue";

const defaultUser = function () {
    return {
        user: {
            id: '',
            name: '',
            username: '',
            email: '',
            phone: '',
            address: {
                geo: {
                    lat: 0,
                    lng: 0
                }
            }
        }
    }
}

const getters = {
    getAllUsersByPage: (state) => {
        const pagedUserListElement = state.pagedUserList[state.page - 1];
        return pagedUserListElement;
    },
    getTotalPages: (state) => state.totalPages,
    getIsUsersLoading: (state) => state.isUsersLoading,
    getDialogVisible: (state) => state.dialogVisible,
    getSelectedUser: (state) => state.selectedUser,
    getSelectedPage: (state) => state.page,
    getPaginationVisible: (state) => state.paginationVisible,
}
const state = {
    users: [],
    selectedUser: defaultUser(),
    dialogVisible: false,
    paginationVisible: false,
    isUsersLoading: true,
    pagedUserList: [],
    page: 1,
    limit: 12,
    totalPages: 1
}
const actions = {
    [GET_ALL_USERS]: async ({commit}) => {
        await api.getAllUsers()
            .then(response => {
                if (response.status === 200) {
                    commit('getAllUsers', response.data);
                } else {
                    //todo дописать
                }
            })
            .catch(() => {
                //todo дописать
                commit('getIsUsersLoading');
            });
    },
    [GET_ALL_USERS_BY_PAGE]: async ({state, commit}) => {
        const {page, limit} = state
        await api.getAllUsersByPage(page, limit)
            .then(response => {
                if (response.status === 200) {
                    commit('getIsUsersNotLoading');
                    commit('getAllPossiblePageAmount', response);
                    commit('getAllUsersByPageSuccess', response.data);
                } else {
                    //todo дописать
                }
            })
            .catch(() => {
                //todo дописать
                commit('getIsUsersLoading');
            });
    },
    [DELETE_USER_BY_ID]: ({commit}, userToDelete) => {
        commit('deleteUserById', userToDelete);
    },
    [CREATE_USER]: ({commit}, userToCreate) => {
        commit('createUser', userToCreate);
    },
    [SHOW_MODAL]: ({commit}) => {
        commit('showDialog');
    },
    [HIDE_MODAL]: ({commit}) => {
        commit('hideDialog');
    },
    [CHANGE_PAGE]: ({commit}, newPage) => {
        commit('changePage', newPage);
    },
    [SELECT_USER]: ({commit}, selectedUser) => {
        commit('selectUser', selectedUser);
    },
    [UNSELECT_USER]: ({commit}) => {
        commit('unselectUser');
    },
}
const mutations = {
    getAllUsers(state, response) {
        state.users = [...response];
        const requiredAmountOfPages = Math.ceil(response.length / state.limit);
        const list = [];
        let index = 0;
        let end = state.users.length < state.limit ? state.users.length : state.limit;
        for (let i = 1; i <= requiredAmountOfPages; i++) {
            const sliceArrayOfUsers = response.slice(index, end);
            list.push(sliceArrayOfUsers);
            index += state.limit;
            end = state.users.length < (state.limit + index) ? state.users.length : state.limit;
        }
        state.pagedUserList = list;
        state.paginationVisible = requiredAmountOfPages > 1;
        state.totalPages = requiredAmountOfPages;
    },
    getAllUsersByPageSuccess(state, response) {
        state.users = [...response];
    },
    getIsUsersNotLoading(state) {
        state.isUsersLoading = false;
    },
    getIsUsersLoading(state) {
        state.isUsersLoading = true;
    },
    deleteUserById(state, userToDelete) {
        console.log('==========deleteUserById===============')
        let pagedUserListElement = state.pagedUserList[state.page - 1];
        let filterByPageList = pagedUserListElement.filter(item => item.id !== userToDelete.id);
        state.pagedUserList[state.page - 1] = [...filterByPageList];

        state.users = state.users.filter(item => item.id !== userToDelete.id);
        if (state.pagedUserList[state.page - 1].length === 0) {
            state.totalPages -= 1;
            state.page -= 1;
            state.paginationVisible = false
        }
    },
    createUser(state, userToCreate) {
        state.users = [...state.users, userToCreate];
        const requiredAmountOfPages = Math.ceil(state.users.length / state.limit);
        const list = [];
        let index = 0;
        let end = state.users.length < state.limit ? state.users.length : state.limit;
        for (let i = 1; i <= requiredAmountOfPages; i++) {
            const sliceArrayOfUsers = state.users.slice(index, end);
            list.push(sliceArrayOfUsers);
            index += state.limit;
            end = state.users.length < (state.limit + index) ? state.users.length : state.limit;
        }
        state.pagedUserList = list
        state.paginationVisible = requiredAmountOfPages > 1;
        state.totalPages = requiredAmountOfPages;
    },
    showDialog(state) {
        state.dialogVisible = true;
    },
    hideDialog(state) {
        state.dialogVisible = false;
    },
    changePage(state, newPage) {
        state.page = newPage;
    },
    selectUser(state, selectedUser) {
        state.selectedUser = Object.assign({}, selectedUser);
    },
    unselectUser(state) {
        state.selectedUser = Object.assign({}, defaultUser());
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};