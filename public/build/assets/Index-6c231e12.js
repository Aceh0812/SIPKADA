import{u as n,R as e,H as r,L as s}from"./app-2f88eaee.js";import{L as m,h as l}from"./Account-8ba589b9.js";import{S as o}from"./Search-d101963d.js";import{P as d}from"./Pagination-e053ca58.js";import{D as i}from"./Delete-f90ef771.js";import"./index-d9835c12.js";import"./sweetalert2.all-92a6b231.js";function w(){const{saksis:a}=n().props;return e.createElement(e.Fragment,null,e.createElement(r,null,e.createElement("title",null,"SAKSI - SIPKADA")),e.createElement(m,null,e.createElement("div",{class:"row mt-5"},e.createElement("div",{class:"col-md-9"},e.createElement("div",{class:"row"},e.createElement("div",{class:"col-md-3 col-12 mb-2"},l(["saksis.create"])&&e.createElement(s,{href:"/account/saksis/create",class:"btn btn-md btn-success border-0 shadow w-100",type:"button"},e.createElement("i",{class:"fa fa-plus-circle me-2"}),"Tambah Saksi")),e.createElement("div",{class:"col-md-9 col-12 mb-2"},e.createElement(o,{URL:"/account/saksis"})))),e.createElement("div",{className:"col-md-4"})),e.createElement("div",{className:"row mt-2 mb-4"},e.createElement("div",{className:"col-12"},e.createElement("div",{className:"card  rounded shadow "},e.createElement("div",{className:"card-header"},e.createElement("span",{className:"font-weight-bold"},e.createElement("i",{className:"fa fa-folder"})," Saksi")),e.createElement("div",{className:"card-body"},e.createElement("div",{className:"table-responsive"},e.createElement("table",{className:"table table-bordered table-striped table-hovered"},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",{scope:"col",style:{width:"5%"}},"No."),e.createElement("th",{scope:"col",style:{width:"15%"}},"Nama Saksi"),e.createElement("th",{scope:"col",style:{width:"15%"}},"No. Hp"),e.createElement("th",{scope:"col",style:{width:"15%"}},"Alamat"),e.createElement("th",{scope:"col",style:{width:"15%"}},"Foto KTP"),e.createElement("th",{scope:"col",style:{width:"15%"}},"No. Hp"),e.createElement("th",{scope:"col",style:{width:"15%"}},"Actions"))),e.createElement("tbody",null,a.data.map((t,c)=>e.createElement("tr",{key:c},e.createElement("td",{className:"text-center"},++c+(a.current_page-1)*a.per_page),e.createElement("td",null,t.name),e.createElement("td",null,t.phone),e.createElement("td",null,t.address),e.createElement("td",null,e.createElement("img",{src:t.ktp,alt:"",width:100})),e.createElement("td",null,t.phone),e.createElement("td",{className:"text-center"},l(["saksis.edit"])&&e.createElement(s,{href:`/account/saksis/${t.id}/edit`,className:"btn btn-default btn-sm me-2"},e.createElement("i",{className:"fa fa-pencil-alt"})),l(["saksis.delete"])&&e.createElement(i,{URL:"/account/saksis",id:t.id}))))))),e.createElement(d,{links:a.links,align:"end"})))))))}export{w as default};
