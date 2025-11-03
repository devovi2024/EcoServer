import Swal from 'sweetalert2';

export function unauthorized(code){
  if(code === 401){
    sessionStorage.clear();
    localStorage.clear();
    window.location.href="/login"
  }
}
export const setEmail = (email) => {
  localStorage.setItem("email", email);
};

export const getEmail = () => {
  return localStorage.getItem("email") || "";
};

export const deleteEmail = () => {
  localStorage.removeItem("email");
};

export const timestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const successAlert = (msg, timer = 2000) => {
  Swal.fire({ icon: "success", title: msg, showConfirmButton: false, timer });
};

export const failAlert = (msg, timer = 2000) => {
  Swal.fire({ icon: "error", title: msg, showConfirmButton: false, timer });
};

export const warningAlert = (msg, timer = 2000) => {
  Swal.fire({ icon: "warning", title: msg, showConfirmButton: false, timer });
};

export const promptAlert = async (msg, placeholder = "") => {
  const { value } = await Swal.fire({
    title: msg,
    input: 'text',
    inputPlaceholder: placeholder,
    showCancelButton: true,
  });
  return value;
};
