<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Kursus Pemgrogramman Online dengan studi kasus">
  <meta name="keywords" content="kurus laravel, kursus progammer, kursus online">
  <meta name="author" content="mwdcourse">
  <meta name="robots" content="index, follow">
  <!-- Penambahan tag Open Graph untuk media sosial -->
  <meta property="og:title" content="mwdcourse, Kursus pemrogramman dengan metode studi kasus">
  <meta property="og:description" content="mwdcourse (Kursus Pemrogramman)">
  <meta property="og:image" content="URL gambar thumbnail untuk tampilan di media sosial">
  <meta name="google-site-verification" content="q_5TEbHUcVKk_pjSKvTLk0Sw73YQeaC_oKJFGK-UP0M" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('/assets/css/styles.css') }}">
  {{-- <link rel="shortcut icon" href="{{ asset('/assets_sidebar/images/logo.png') }}" /> --}}
  {{-- <link href="{{asset('assets/css/jquery-jvectormap-2.0.2.css')}}" rel="stylesheet"/>
	<link href="{{asset('assets/css/simplebar.css')}}" rel="stylesheet" />
	<link href="{{asset('assets/css/perfect-scrollbar.css')}}" rel="stylesheet" />
	<link href="{{asset('assets/css/metisMenu.min.css')}}" rel="stylesheet"/> --}}
	<!-- loader-->
	{{-- <link href="{{asset('assets/css/pace.min.css')}}" rel="stylesheet"/>
	<script src="{{asset('assets/js/pace.min.js')}}"></script> --}}
	<!-- Bootstrap CSS -->
	{{-- <link href="{{asset('assets/css/bootstrap.min.css')}}" rel="stylesheet">
	<link href="{{asset('assets/css/bootstrap-extended.css')}}" rel="stylesheet"> --}}
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
	<link href="{{asset('assets/css/app.css')}}" rel="stylesheet">
	<link href="{{asset('assets/css/icons.css')}}" rel="stylesheet">
	<!-- Theme Style CSS -->
	{{-- <link rel="stylesheet" href="{{asset('assets/css/dark-theme.css')}}"/>
	<link rel="stylesheet" href="{{asset('assets/css/semi-dark.css')}}"/>
	<link rel="stylesheet" href="{{asset('assets/css/header-colors.css')}}"/> --}}
  @viteReactRefresh
  @vite('resources/js/app.jsx')
  @inertiaHead
</head>
<body class="hold-transition sidebar-mini" style="background-color:#fefeff!important;  overflow-x: hidden">

    @inertia

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
