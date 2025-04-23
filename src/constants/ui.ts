import { SweetAlertOptions } from "sweetalert2";

export const swalCustomClass = {
  container: "swal-custom",
  popup: "popup-custom",
  title: "title-custom",
  //closeButton: '...',
  icon: "icon-custom",
  actions: "actions-custom",
  //confirmButton: '...',
  //denyButton: '...',
  //cancelButton: '...',
};

export const swalConfirmOption: SweetAlertOptions = {
  title: "정말 삭제할까요?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "삭제",
  cancelButtonText: "취소",
  iconColor: "#9965f4",
  confirmButtonColor: "#EF5350",
  customClass: swalCustomClass,
};
