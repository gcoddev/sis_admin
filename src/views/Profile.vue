<template>
  <div class="container">
    <div class="row">
      <div class="col-12 card mt-2">
        <div class="row align-items-center">
          <div class="card-body col-12 col-md-4">
            <img
              class="card-img"
              :src="url_api + '/UsuarioAdmin/' + userAdminData.imagen"
              alt=""
            />
          </div>
          <div class="card-body col-12 col-md-8">
            <div class="card-title">
              <h2 class="text-dark">Datos personales</h2>
            </div>
            <div class="card-text">
              <div class="row">
                <div class="col-4 col-md-2 fw-bold">Nombres:</div>
                <div class="col-8 col-md-4">{{ userAdminData.nombre }}</div>
                <div class="col-4 col-md-2 fw-bold">Apellidos:</div>
                <div class="col-8 col-md-4">{{ userAdminData.apellido }}</div>
                <div class="col-4 col-md-2 fw-bold">Celular:</div>
                <div class="col-8 col-md-4">{{ userAdminData.celular }}</div>
                <div class="col-4 col-md-2 fw-bold">Gmail:</div>
                <div class="col-8 col-md-4">{{ userAdminData.gmail }}</div>
                <div class="col-4 col-md-2 fw-bold">Rol:</div>
                <div class="col-8 col-md-4">{{ userAdminData.roles }}</div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="float-end" v-if="admin">
              <button
                class="btn btn-sm btn-warning"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#editUser"
              >
                <i class="mdi mdi-account-plus"></i> Editar usuario
              </button>
              <button
                class="btn btn-sm btn-success ms-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#newUser"
              >
                <i class="mdi mdi-account-plus"></i> Registrar usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Static Backdrop modal -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="editUser"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark" id="staticBackdropLabel">
              Editar usuario
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-hidden="true"
            ></button>
          </div>
          <!-- end modal header -->

          <div class="modal-body">
            <input
              type="text"
              placeholder="Buscar usuario"
              v-model="ciSearch"
              @keyup="searchUsuario(ciSearch)"
              class="form-control mb-2"
            />
            <div
              v-if="resShow"
              class="alert"
              :class="[ciSearch.length >= 7 ? 'alert-danger' : 'alert-warning']"
            >
              {{ res }}
            </div>
            <div v-show="resDataShow">
              <div class="card">
                <div class="row g-0 align-items-center">
                  <div class="col-md-4">
                    <img
                      class="card-img"
                      :src="url_api + '/UsuarioAdmin/' + resData.imagen"
                      alt="user-image"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title text-dark">Datos de usuario</h5>
                      <div class="card-">
                        <b>NOMBRES: </b>{{ resData.nombre }}
                        {{ resData.apellido }}<br />
                        <b>CELULAR: </b>{{ resData.celular }}<br />
                        <b>GMAIL: </b>{{ resData.gmail }}<br />
                        <b>ROL: </b>{{ resData.roles }}
                      </div>
                    </div>
                    <!-- end card-body-->
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row-->
              </div>
              <div class="mb-2">
                <label class="form-label">Carrera</label>
                <select class="form-control" v-model="carrera_id">
                  <option value="">-- Seleccione opcion --</option>
                  <option
                    v-for="(carr, id_carr) of Carreras"
                    :key="id_carr"
                    :value="carr.carrera_id"
                  >
                    {{ carr.carrera }}
                  </option>
                </select>
              </div>
              <div class="mb-2">
                <label class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nombre de usuario"
                  v-model="username"
                />
              </div>
              <div class="mb-2">
                <label for="password" class="form-label"
                  >Nueva contraseña</label
                >
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    id="password_e"
                    class="form-control"
                    placeholder="Ingrese su nueva contraseña"
                    v-model="password"
                  />
                  <div
                    class="input-group-text"
                    data-password="false"
                    @click="showPassword_e()"
                    id="eye1_e"
                    style="cursor: pointer"
                  >
                    <span class="password-eye"></span>
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <label for="password_confirm" class="form-label"
                  >Confirmar nueva contraseña</label
                >
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    class="form-control"
                    id="password_confirm_e"
                    placeholder="Confirmar su nueva contraseña"
                    v-model="password_confirm"
                    :class="[
                      password_confirm != ''
                        ? [passwordConfirm ? 'is-valid' : 'is-invalid']
                        : '',
                    ]"
                  />
                  <div
                    class="input-group-text"
                    data-password="false"
                    @click="showPasswordConfirm_e()"
                    id="eye2_e"
                    style="cursor: pointer"
                  >
                    <span class="password-eye"></span>
                  </div>
                  <div class="valid-feedback">
                    Las contraseñas coinciden satisfactoriamente
                  </div>
                  <div class="invalid-feedback">
                    Las contraseñas no coinciden
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <label>Rol</label>
                <select class="form-control" v-model="group_id">
                  <option value="">-- Seleccione opcion --</option>
                  <option
                    v-for="(group, id_group) of Groups"
                    :key="id_group"
                    :value="group.id"
                  >
                    {{ group.description }}
                  </option>
                </select>
              </div>
              <div class="mb-2">
                <label class="form-label">Celular</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Numero de celular"
                  v-model="celular"
                />
              </div>
              <div class="mb-2">
                <label class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Correo electronico"
                  v-model="email"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              id="cerrar_e"
              @click="resetI()"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="validar_e()"
              :data-bs-dismiss="[val ? 'modal' : '']"
              :disabled="!resDataShow"
            >
              Editar usuario
            </button>
          </div>
          <!-- end modal footer -->
        </div>
        <!-- end modal content-->
      </div>
      <!-- end modal dialog-->
    </div>
    <div
      class="modal fade"
      id="newUser"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark" id="staticBackdropLabel">
              Registrar nuevo usuario
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-hidden="true"
            ></button>
          </div>
          <!-- end modal header -->
          <div class="modal-body">
            <div>
              <div class="mb-2">
                <label class="form-label">CI</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el CI"
                  v-model="ci"
                />
              </div>
              <div class="mb-2">
                <label class="form-label">Carrera</label>
                <select class="form-control" v-model="carrera_id">
                  <option value="">-- Seleccione opcion --</option>
                  <option
                    v-for="(carr, id_carr) of Carreras"
                    :key="id_carr"
                    :value="carr.carrera_id"
                  >
                    {{ carr.carrera }}
                  </option>
                </select>
              </div>
              <div class="mb-2">
                <label class="form-label">Direccion IP</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="IP address"
                  v-model="ip_address"
                />
              </div>
              <div class="mb-2">
                <label class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nombre de usuario"
                  v-model="username"
                />
              </div>
              <div class="mb-2">
                <label for="password" class="form-label">Contraseña</label>
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="Ingrese su contraseña"
                    v-model="password"
                  />
                  <div
                    class="input-group-text"
                    data-password="false"
                    @click="showPassword()"
                    id="eye1"
                    style="cursor: pointer"
                  >
                    <span class="password-eye"></span>
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <label for="password_confirm" class="form-label"
                  >Confirmar contraseña</label
                >
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    class="form-control"
                    id="password_confirm"
                    placeholder="Confirmar contraseña"
                    v-model="password_confirm"
                    :class="[
                      password_confirm != ''
                        ? [passwordConfirm ? 'is-valid' : 'is-invalid']
                        : '',
                    ]"
                  />
                  <div
                    class="input-group-text"
                    data-password="false"
                    @click="showPasswordConfirm()"
                    id="eye2"
                    style="cursor: pointer"
                  >
                    <span class="password-eye"></span>
                  </div>
                  <div class="valid-feedback">
                    Las contraseñas coinciden satisfactoriamente
                  </div>
                  <div class="invalid-feedback">
                    Las contraseñas no coinciden
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <label>Rol</label>
                <select class="form-control" v-model="group_id">
                  <option value="">-- Seleccione opcion --</option>
                  <option
                    v-for="(group, id_group) of Groups"
                    :key="id_group"
                    :value="group.id"
                  >
                    {{ group.description }}
                  </option>
                </select>
              </div>
              <div class="mb-2">
                <label class="form-label">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Solo nombre completo de estudiante"
                  v-model="nombre"
                />
              </div>
              <div class="mb-2">
                <label for="perfil_img">Foto de perfil</label>
                <input
                  type="file"
                  name="perfil_img"
                  class="form-control mt-1"
                  id="user_avatar"
                  @change="onFileChange()"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              id="cerrar_n"
              @click="resetI()"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="validar()"
              :data-bs-dismiss="[val ? 'modal' : '']"
            >
              Agregar usuario
            </button>
          </div>
          <!-- end modal footer -->
        </div>
        <!-- end modal content-->
      </div>
      <!-- end modal dialog-->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Groups: [],
      Carreras: [],

      ciSearch: "",
      resShow: false,
      res: "",

      resDataShow: false,
      resData: {},

      ci: "",
      carrera_id: "",
      ip_address: "",
      username: "",
      password: "",
      password_confirm: "",
      group_id: "",
      nombre: "",
      imagen: null,
      val: false,

      celular: "",
      email: "",
    };
  },
  computed: {
    ...mapState(["userAdminData", "url_api"]),
    admin() {
      if (this.userAdminData.roles == "ADMINISTRADOR") {
        return true;
      } else {
        return false;
      }
    },
    passwordConfirm() {
      if (this.password == this.password_confirm) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async searchUsuario(ci) {
      if (this.ciSearch == "" || this.ciSearch == null) {
        this.resDataShow = false;
        this.resShow = false;
      } else {
        try {
          let res = await this.axios.get("/api/Editar-Persona/" + ci);
          this.resShow = false;
          this.resDataShow = true;
          this.resData = res.data;
          this.username = this.resData.usuario;
          this.celular = this.resData.celular;
          this.email = this.resData.gmail;
          // console.log(this.resData);
          this.ci = ci;
        } catch (error) {
          this.resDataShow = false;
          this.resShow = true;
          if (this.ciSearch.length >= 7) {
            this.res = error.response.data.message;
          } else {
            this.res = "Buscando...";
          }
        }
      }
    },
    async putUser() {
      try {
        let putUsuario = {
          carrera_id: this.carrera_id,
          username: this.username,
          password: this.password,
          email: this.email,
          celular: this.celular,
          group_id: this.group_id,
        };
        let res = await this.axios.put(
          "/api/Editar-Persona/" + this.ci,
          putUsuario
        );
        this.$swal({
          title: res.data.message,
          icon: "success",
          showConfirmButton: true,
          timer: 1500,
        });
        this.ci = "";
        this.carrera_id = "";
        this.username = "";
        this.password = "";
        this.password_confirm = "";
        this.email = "";
        this.celular = "";
        this.group_id = "";
        document.querySelector("#cerrar_e").click();
        this.ciSearch = "";
        this.resShow = false;
        this.resDataShow = false;
      } catch (error) {
        // console.log("error putUser");
        // console.log(error);
        this.$swal({
          title: error.response.data.message,
          icon: "error",
          showConfirmButton: true,
        });
      }
    },
    async getGroups() {
      try {
        let res = await this.axios.get("/api/GrupoUser/");
        this.Groups = res.data;
      } catch (error) {
        // console.log("error getGroups");
        // console.log(error);
      }
    },
    async getCarreras() {
      try {
        let res = await this.axios.get("/api/upeacarrera/");
        this.Carreras = res.data;
      } catch (error) {
        // console.log("error getCarreras");
        // console.log(error);
      }
    },
    onFileChange() {
      let img = document.querySelector("#user_avatar");
      this.imagen = img.files[0];
    },
    async createUser() {
      let postUser = {
        ci: this.ci,
        carrera_id: this.carrera_id,
        ip_address: this.ip_address,
        username: this.username,
        password: this.password_confirm,
        group_id: this.group_id,
        nombre: this.nombre,
        imagen: this.imagen,
      };
      try {
        let res = await this.axios.post(
          "/api/Buscar-Agregar-Persona/",
          postUser,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.$swal({
          title: res.data.message,
          icon: "success",
          showConfirmButton: true,
          timer: 1500,
        });
        this.val = true;
        this.ci = "";
        this.carrera_id = "";
        this.ip_address = "";
        this.username = "";
        this.password = "";
        this.password_confirm = "";
        this.group_id = "";
        this.nombre = "";
        this.imagen = null;
        document.querySelector("#user_avatar").val = null;
        document.querySelector("#cerrar_n").click();
      } catch (error) {
        // console.log("error createUser");
        // console.log(error);
        this.$swal({
          title: error.response.data.message,
          icon: "error",
          showConfirmButton: true,
        });
      }
    },
    validar() {
      if (this.ci != "") {
        if (this.carrera_id != "") {
          if (this.ip_address != "") {
            if (this.username != "") {
              if (this.password != "") {
                if (this.password_confirm != "") {
                  if (this.group_id != "") {
                    if (this.nombre != "") {
                      if (this.imagen != null) {
                        this.createUser();
                      } else {
                        this.alertDisplay(
                          "Foto de perfil vacio",
                          "warning",
                          1500
                        );
                      }
                    } else {
                      this.alertDisplay(
                        "Nombre de estudiante vacio",
                        "warning",
                        1500
                      );
                    }
                  } else {
                    this.alertDisplay("Rol vacio", "warning", 1500);
                  }
                } else {
                  this.alertDisplay(
                    "Debe confirmar la contraseña",
                    "warning",
                    1500
                  );
                }
              } else {
                this.alertDisplay("Contraseña vacio", "warning", 1500);
              }
            } else {
              this.alertDisplay("Nombre de usuario vacio", "warning", 1500);
            }
          } else {
            this.alertDisplay("IP vacio", "warning", 1500);
          }
        } else {
          this.alertDisplay("Carrera vacio", "warning", 1500);
        }
      } else {
        this.alertDisplay("CI vacio", "warning", 1500);
      }
    },
    validar_e() {
      if (this.carrera_id != "") {
        if (this.username != "") {
          if (this.password != "") {
            if (this.password_confirm != "") {
              if (this.group_id != "") {
                this.putUser();
              } else {
                this.alertDisplay("Rol vacio", "warning", 1500);
              }
            } else {
              this.alertDisplay(
                "Debe confirmar la contraseña",
                "warning",
                1500
              );
            }
          } else {
            this.alertDisplay("Contraseña vacio", "warning", 1500);
          }
        } else {
          this.alertDisplay("Nombre de usuario vacio", "warning", 1500);
        }
      } else {
        this.alertDisplay("Carrera vacio", "warning", 1500);
      }
    },
    alertDisplay(msg, icon, time) {
      this.$swal({
        title: msg,
        icon: icon,
        showConfirmButton: true,
        timer: time,
      });
    },
    showPassword() {
      let inputPassword = document.querySelector("#password");
      let eye = document.querySelector("#eye1");
      if (eye.getAttribute("data-password") == "false") {
        eye.setAttribute("data-password", "true");
        eye.classList.add("show-password");
        inputPassword.setAttribute("type", "text");
      } else {
        eye.setAttribute("data-password", "false");
        eye.classList.remove("show-password");
        inputPassword.setAttribute("type", "password");
      }
    },
    showPasswordConfirm() {
      let inputPassword = document.querySelector("#password_confirm");
      let eye = document.querySelector("#eye2");
      if (eye.getAttribute("data-password") == "false") {
        eye.setAttribute("data-password", "true");
        eye.classList.add("show-password");
        inputPassword.setAttribute("type", "text");
      } else {
        eye.setAttribute("data-password", "false");
        eye.classList.remove("show-password");
        inputPassword.setAttribute("type", "password");
      }
    },
    showPassword_e() {
      let inputPassword = document.querySelector("#password_e");
      let eye = document.querySelector("#eye1_e");
      if (eye.getAttribute("data-password") == "false") {
        eye.setAttribute("data-password", "true");
        eye.classList.add("show-password");
        inputPassword.setAttribute("type", "text");
      } else {
        eye.setAttribute("data-password", "false");
        eye.classList.remove("show-password");
        inputPassword.setAttribute("type", "password");
      }
    },
    showPasswordConfirm_e() {
      let inputPassword = document.querySelector("#password_confirm_e");
      let eye = document.querySelector("#eye2_e");
      if (eye.getAttribute("data-password") == "false") {
        eye.setAttribute("data-password", "true");
        eye.classList.add("show-password");
        inputPassword.setAttribute("type", "text");
      } else {
        eye.setAttribute("data-password", "false");
        eye.classList.remove("show-password");
        inputPassword.setAttribute("type", "password");
      }
    },
    resetI() {
      this.ciSearch = "";
      this.resShow = false;
      this.res = "";
      this.resDataShow = false;
      this.resData = {};
      this.ci = "";
      this.carrera_id = "";
      this.ip_address = "";
      this.username = "";
      this.password = "";
      this.password_confirm = "";
      this.group_id = "";
      this.nombre = "";
      this.imagen = null;
      this.val = false;
      this.celular = "";
      this.email = "";
    },
  },
  created() {
    this.getGroups();
    this.getCarreras();
  },
};
</script>