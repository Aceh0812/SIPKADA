import{u as E,r as t,R as e,H as f,d as p}from"./app-2f88eaee.js";import{L as v}from"./Account-8ba589b9.js";import{S as N}from"./sweetalert2.all-92a6b231.js";import{S as c}from"./react-select.esm-64768b31.js";import"./index-d9835c12.js";function k(){const{errors:s,kabupatens:r,kecamatans:o}=E().props,[l,u]=t.useState(""),[n,d]=t.useState(null),[m,i]=t.useState(null),b=async a=>{a.preventDefault(),p.Inertia.post("/account/desas",{name:l,kabupaten_id:n.value,kecamatan_id:m.value},{onSuccess:()=>{N.fire({title:"Success!",text:"Data saved successfully!",icon:"success",showConfirmButton:!1,timer:1500})}})};return e.createElement(e.Fragment,null,e.createElement(f,null,e.createElement("title",null,"TAMBAH DESA - SIPKADA")),e.createElement(v,null,e.createElement("div",{className:"row mt-4"},e.createElement("div",{className:"col-12"},e.createElement("div",{className:"card border-0 rounded shadow-sm border-top-success"},e.createElement("div",{className:"card-header"},e.createElement("span",{className:"font-weight-bold"},e.createElement("i",{className:"fa fa-folder"})," Tambah Desa")),e.createElement("div",{className:"card-body"},e.createElement("form",{onSubmit:b},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Nama Desa"),e.createElement("input",{type:"text",className:"form-control",value:l,onChange:a=>u(a.target.value),placeholder:"Tambah Nama Desa"})),s.name&&e.createElement("div",{className:"alert alert-danger"},s.name),e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Kabupaten"),e.createElement(c,{options:r,value:n,onChange:a=>d(a)})),e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Kecamatan"),e.createElement(c,{options:o,value:m,onChange:a=>i(a)})),e.createElement("div",null,e.createElement("button",{type:"submit",className:"btn btn-md btn-success me-2"},e.createElement("i",{className:"fa fa-save"})," Save")))))))))}export{k as default};
