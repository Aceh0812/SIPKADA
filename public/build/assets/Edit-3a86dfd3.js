import{u as r,r as m,R as e,H as o,d as u}from"./app-2f88eaee.js";import{L as d}from"./Account-8ba589b9.js";import{S as i}from"./sweetalert2.all-92a6b231.js";import"./index-d9835c12.js";function N(){const{errors:t,kabupaten:s}=r().props,[l,n]=m.useState(s.name),c=async a=>{a.preventDefault(),u.Inertia.post(`/account/kabupatens/${s.id}`,{name:l,_method:"PUT"},{onSuccess:()=>{i.fire({title:"Success!",text:"Data updated successfully!",icon:"success",showConfirmButton:!1,timer:1500})}})};return e.createElement(e.Fragment,null,e.createElement(o,null,e.createElement("title",null,"EDIT KABUPATEN - SIPKADA")),e.createElement(d,null,e.createElement("div",{className:"row mt-4"},e.createElement("div",{className:"col-12"},e.createElement("div",{className:"card border-0 rounded shadow-sm border-top-success"},e.createElement("div",{className:"card-header"},e.createElement("span",{className:"font-weight-bold"},e.createElement("i",{className:"fa fa-folder"})," Edit Kabuapten")),e.createElement("div",{className:"card-body"},e.createElement("form",{onSubmit:c},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Edit Nama Kabupaten"),e.createElement("input",{type:"text",className:"form-control",value:l,onChange:a=>n(a.target.value),placeholder:"Edit Nama Kabupaten"})),t.name&&e.createElement("div",{className:"alert alert-danger"},t.name),e.createElement("div",null,e.createElement("button",{type:"submit",className:"btn btn-md btn-success me-2"},e.createElement("i",{className:"fa fa-save"})," Save")))))))))}export{N as default};
