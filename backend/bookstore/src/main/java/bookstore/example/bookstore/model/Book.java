package bookstore.example.bookstore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String author;
    private double weight;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String language;
    private int year;
    @Column(name = "quant_of_pages")
    private int quantOfPages;
    @Column(name = "quant_in_stock")
    private int quantInStock;
    private double price;
    private int discount;
    public Book(Long id, String title, String author, double weight, String description, String language, int year,
            int quantOfPages, int quantInStock, double price, int discount) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.weight = weight;
        this.description = description;
        this.language = language;
        this.year = year;
        this.quantOfPages = quantOfPages;
        this.quantInStock = quantInStock;
        this.price = price;
        this.discount = discount;
    }

    public Book() {

    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public double getWeight() {
        return weight;
    }
    public void setWeight(double weight) {
        this.weight = weight;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getLanguage() {
        return language;
    }
    public void setLanguage(String language) {
        this.language = language;
    }
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public int getQuantOfPages() {
        return quantOfPages;
    }
    public void setQuantOfPages(int quantOfPages) {
        this.quantOfPages = quantOfPages;
    }
    public int getQuantInStock() {
        return quantInStock;
    }
    public void setQuantInStock(int quantInStock) {
        this.quantInStock = quantInStock;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }    

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }
}
