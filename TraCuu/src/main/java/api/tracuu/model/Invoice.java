package api.tracuu.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
public class Invoice {
    @Id
    private int maHoaDon;
    private String kyHieu;
    private int soHoaDon;
    private String loTrinh;
    private int giaVe;
    private String soGhe;
    private String soXe;
    private LocalDateTime thoiGianXuatBen;
    private LocalDate ngayKhoiHanh;
    public Invoice(int maHoaDon, String kyHieu, int soHoaDon, String loTrinh, int giaVe, String soGhe, String soXe, LocalDateTime thoiGianXuatBen, LocalDate ngayKhoiHanh) {
        super();
        this.maHoaDon = maHoaDon;
        this.kyHieu = kyHieu;
        this.soHoaDon = soHoaDon;
        this.loTrinh = loTrinh;
        this.giaVe = giaVe;
        this.soGhe = soGhe;
        this.soXe = soXe;
        this.thoiGianXuatBen = thoiGianXuatBen;
        this.ngayKhoiHanh = ngayKhoiHanh;
    }

    public Invoice() {
        super();
    }
}
