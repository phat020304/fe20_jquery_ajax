function NguoiDungServices() {

    this.layDanhSachNguoiDung = function () {
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"         //có 4 giao thức : GET(lấy), POST(thêm), PUT(cập nhật), DELETE(xóa)
        })
            .done(function (result) {
                localStorage.setItem("DSND", JSON.stringify(result));
                TaoBang(result);
            })
            .fail(function (err) {
                console.log(err);
            })

        //console.log(this.danhSachNguoiDung);
    }

    this.themNguoiDung = function (nguoiDung) {
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung
        })
            .done(function (result) {
                if (result === "tai khoan da ton tai !") {
                    alert(result);
                } else {
                    location.reload();
                }
            })
            .fail(function (err) {
                console.log(err);
            })
    }

    this.capNhatNguoiDung = function(nguoiDung){
        var ngd = JSON.stringify(nguoiDung);
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            data: ngd,
            contentType: "application/json",
            dataType: "json"
        })
        .done(function(res){
            location.reload();
            console.log(res)
        })
        .fail(function (err) {
            console.log(err);
        })
    }

    this.xoaNguoiDung = function (taiKhoan) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            type: "DELETE"
        })
            .done(function (result) {
                location.reload();
                console.log(result);
            })
            .fail(function (err) {
                console.log(err);
            })
    }

    this.layThongTinNguoiDung = function (taiKhoan) {
        var danhSachNguoiDung = JSON.parse(localStorage.getItem("DSND"));
        var nguoiDung;

        danhSachNguoiDung.map(function (item) {
            if (item.TaiKhoan === taiKhoan) {
                nguoiDung = item;
                return nguoiDung;
            }
        })
        return nguoiDung;
    }
}


function TaoBang(danhSachMang) {
    var tblBody = '';

    danhSachMang.map(function (item, index) {
        tblBody += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.TaiKhoan}</td>
            <td>${item.MatKhau}</td>
            <td>${item.HoTen}</td>
            <td>${item.Email}</td>
            <td>${item.SoDT}</td>
            <td>${item.MaLoaiNguoiDung}</td>
            <td>
                <button class="btn btn-success btnSua" data-toggle="modal" data-target="#myModal" data-taikhoan="${item.TaiKhoan}">Sửa</button>
                <button class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
            </td>
        </tr>
        `
    })

    // for(var i = 0; i < danhSachMang.length; i++){
    //     tblBody += `
    //     <tr>
    //         <td>${i+1}</td>
    //         <td>${danhSachMang[i].TaiKhoan}</td>
    //         <td>${danhSachMang[i].MatKhau}</td>
    //         <td>${danhSachMang[i].HoTen}</td>
    //         <td>${danhSachMang[i].Email}</td>
    //         <td>${danhSachMang[i].SoDT}</td>
    //         <td>${danhSachMang[i].TenLoaiNguoiDung}</td>
    //         <td>
    //             <button class="btn btn-success btnSua" data-toggle="modal" data-target="#myModal">Sửa</button>
    //             <button class="btn btn-danger btnXoa">Xóa</button>
    //         </td>
    //     </tr>
    //     `
    // }
    $("#tblDanhSachNguoiDung").html(tblBody);
}
