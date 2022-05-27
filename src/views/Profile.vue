<template>
  <div class="container">
    <div class="row">
      <div class="col-12 card mt-2">
        <div class="row align-items-center">
          <div class="card-body col-12 col-md-4">
            <img
              class="card-img"
              :src="
                'https://serviciopagina.upea.bo/UsuarioAdmin/' +
                userAdminData.imagen
              "
              alt=""
            />
          </div>
          <div class="card-body col-12 col-md-8">
            <div class="card-title"><h2>Datos personales</h2></div>
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
            <button
              class="btn btn-sm btn-success float-end"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#editProfile"
            >
              <i class="mdi mdi-account-plus"></i> Registrar usuario
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Static Backdrop modal -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="editProfile"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Editar datos de usuario
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
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Celular</label>
              </div>
              <div class="form-floating mt-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Email</label>
              </div>
              <div class="mt-3">
                <label for="perfil_img">Foto de perfil</label>
                <input
                  type="file"
                  name="perfil_img"
                  class="form-control mt-1"
                  id="perfil_img"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-success">
              Actualizar datos
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
  computed: {
    ...mapState(["userAdminData"]),
  },
};
</script>