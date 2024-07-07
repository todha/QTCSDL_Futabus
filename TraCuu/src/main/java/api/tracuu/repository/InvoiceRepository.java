package api.tracuu.repository;

import api.tracuu.model.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    Optional<Invoice> findByMaHoaDon(double maHoaDon);
}
