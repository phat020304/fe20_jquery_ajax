$(document).ready(function(){
    var nguoiDungService = new NguoiDungServices();

    layDanhSachNguoiDung();

    function moiTaoBranch(){
        console.log("thêm");
    }

    function setHeaderFooterModal(title, titleButton, idButton){
        $(".modal-title").html(title);

        var footer = `
            <button class="btn btn-success" id=${idButton}>${titleButton}</button>
        `
        $(".modal-footer").html(footer);
    }

    $("#btnThemNguoiDung").click(function(){
        setHeaderFooterModal("Thêm người dùng","Thêm mới", "btnThem");
    })

    $("body").delegate(".btnSua", "click", function(){
        //những thứ phát sinh sau thì DOM bằng phương pháp delegate
        setHeaderFooterModal("Sửa người dùng","Cập nhật", "btnCapNhat");
        var taiKhoan = $(this).data('taikhoan');
        var nguoiDung = nguoiDungService.layThongTinNguoiDung(taiKhoan);
        console.log(nguoiDung);

        $("#TaiKhoan").attr("disabled","disabled");

        $("#TaiKhoan").val(nguoiDung.TaiKhoan);
        $("#HoTen").val(nguoiDung.HoTen);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#Email").val(nguoiDung.Email);
        $("#SoDienThoai").val(nguoiDung.SoDT);
        $("#loaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);

        
    })

    $("body").delegate(".btnXoa", "click", function(){
        var taiKhoan = $(this).data('taikhoan');
        nguoiDungService.xoaNguoiDung(taiKhoan);
    })

    $("body").delegate("#btnThem", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDungs").val();

        var nguoiDung = new NguoiDung(taiKhoan,matKhau,hoTen,email,soDienThoai,loaiNguoiDung)

        nguoiDungService.themNguoiDung(nguoiDung);
    })

    $("body").delegate("#btnCapNhat","click",function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDungs").val();

        var nguoiDung = new NguoiDung(taiKhoan,matKhau,hoTen,email,soDienThoai,loaiNguoiDung);

        nguoiDungService.capNhatNguoiDung(nguoiDung);
    })

    function layDanhSachNguoiDung(){
        nguoiDungService.layDanhSachNguoiDung();
    }

    
})