package api.tracuu.controller;

import lombok.extern.slf4j.Slf4j;
import api.tracuu.model.Invoice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import api.tracuu.repository.InvoiceRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Slf4j
public class InvoiceController {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @PostMapping("/Invoice")
    public ResponseEntity<Invoice> themHoaDon(@RequestBody Invoice hoaDon) {
        try {
            Invoice savedInvoice = invoiceRepository.save(hoaDon);
            return new ResponseEntity<>(savedInvoice, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error occurred while saving the invoice: ", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/Invoice")
    public ResponseEntity<List<Invoice>> xemDanhSachHoaDon() {
        try {
            List<Invoice> invoiceList = new ArrayList<>();
            invoiceRepository.findAll().forEach(invoiceList::add);

            if (invoiceList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(invoiceList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/Invoice/{maHoaDon}")
    public ResponseEntity<Invoice> getHoaDonByMaHoaDon(@PathVariable int maHoaDon) {
        Optional<Invoice> invoice = invoiceRepository.findById(maHoaDon);
        if (invoice.isPresent()) {
            return ResponseEntity.ok(invoice.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
