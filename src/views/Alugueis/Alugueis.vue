<script setup>
import Nav from '../../components/Nav.vue';
import api from '../../services/api.js';
</script>
<template>
    <div class="container">
        <Nav></Nav>
        <section class="container-title">
            <h1>Lista de Alugueis</h1>
            <svg-icon type="mdi" style="color: #A73C8C" :size="30" class="icone" :path="iconParty"></svg-icon>
        </section>
        <v-btn class="bnt" v-bind="props" @click="this.$router.push('/form-alugueis');">
            Novo Aluguel
        </v-btn>
        <section class="container-page">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Código
                        </th>
                        <th class="text-left">
                            Tema
                        </th>
                        <th class="text-left">
                            Cliente
                        </th>
                        <th class="text-left">
                            Data Aluguel
                        </th>
                        <th class="text-left">
                            Hora Início
                        </th>
                        <th class="text-left">
                            Hora Fim
                        </th>
                        <th class="text-left actions-header">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in alugueis" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.theme.name }}</td>
                        <td>{{ item.client.name }}</td>
                        <td>{{ formatDate(item.date) }}</td>
                        <td>{{ item.start_hours }}</td>
                        <td>{{ item.end_hours }}</td>
                        <td class="actions">
                            <svg-icon type="mdi" style="color: #174e66" :size="22" class="iconTable" :path="iconEdit" @click="this.goToEdit(item.id);" ></svg-icon>


                            <v-dialog v-model="dialog" persistent width="auto">
                                <template v-slot:activator="{ props }">
                                    <svg-icon type="mdi" style="color: #174e66" :size="22" @click="this.idForDelete=item.id" class="iconTable" v-bind="props"
                                        :path="iconDelete"></svg-icon>
                                </template>
                                <v-card>
                                    <v-card-title class="text-h5">
                                        Excluir este Aluguel?
                                    </v-card-title>
                                    <v-card-text>
                                        Você deseja realmente apagar este aluguel? Esta ação é irreversível.
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red" variant="text" @click="dialog = false">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="green-darken-1" variant="text" @click="deleteAluguel(idForDelete)">
                                            Confirmar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </section>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount, mdiPencilOutline, mdiTrashCanOutline, mdiEyeOutline } from '@mdi/js';

export default {
    components: {
        SvgIcon
    },
    data() {
        return {
            iconParty: mdiAccount,
            iconEdit: mdiPencilOutline,
            iconDelete: mdiTrashCanOutline,
            iconDetail: mdiEyeOutline,
            alugueis: [],
            dialog: false,
            idForDelete: null,
        }
    },
    created() {
        this.getAlugueis();
    },
    methods: {
        formatDate(dataString) {
            const data = new Date(dataString);
            const nomeMeses = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
            const dia = data.getDate();
            const mes = nomeMeses[data.getMonth()];
            const ano = data.getFullYear();
            return `${mes} ${dia + 1}, ${ano}`;
    },
        getAlugueis() {
            api
                .get("/rents/")
                .then((res) => {
                    this.alugueis = res.data;
                    //console.log(res.data);
                    return this.alugueis;
                })
                .then((res) => {
                    res.map((item) => {
                        api
                        .get(`/clients/${item.client}/`)
                        .then((res) => {
                            item.client = res.data;
                            console.log(item.client);
                        }),
                        api
                        .get(`/themes/${item.theme}/`)
                        .then((res) => {
                            item.theme = res.data;
                            console.log(item.theme);
                        })
                    })
                })
                .catch((error) => {
                    console.log(error);
                    return;
                });
        },
        getClientById(clientId){
            api
                .get(`/clients/${clientId}/`)
                .then((res) => {
                    //console.log(res.data)
                    return res.data;
                    //console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getThemeById(themeId){
            api
                .get(`/themes/${themeId}/`)
                .then((res) => {
                    //console.log(res.data)
                    return res.data;
                    //console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteAluguel(id) {
            api
                .delete(`/rents/${id}/`)
                .then(() => {
                    console.log('Item excluido');
                    this.getAlugueis();
                    this.dialog = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        goToEdit(id){
            this.$router.push({ name: 'edit-alugueis', params: { id: id }});
        }
    }
}
</script>
<style scoped>
.container-page {
    margin: 4em;
    padding: 1em;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    border-radius: 10px;
}

.container-title {
    display: flex;
    color: #A73C8C;
    font-weight: bold !important;
    margin-left: 4em;
}

.icone {
    align-self: center;
    margin-left: 5px;
}

h1 {
    font-weight: bold !important;
}

.bnt {
    background-color: #0066FF;
    margin-right: 4em;
    color: white;
    float: right;
}

.iconTable {
    margin-left: 1em;
}

.actions {
    width: 15vw;
}
</style>
  