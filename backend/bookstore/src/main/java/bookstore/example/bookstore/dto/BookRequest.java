package bookstore.example.bookstore.dto;

import jakarta.persistence.Column;

public class BookRequest {
    private String title;
    private String author;
    private double weight;
    private String description;
    private String language;
    private int year;
    private int quantOfPages;
    private int quantInStock;
    private double price;
    private int discount;
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
