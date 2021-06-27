package com.netcracker.skillstable.model;

import javax.persistence.*;

@Entity(name="EntityType")
@Table (name = "entity_types")
public class EntityType {
    @Id
    @Column(
            name = "ent_type_id",
            updatable = false,
            nullable = false,
            columnDefinition = "SERIAL"
    )
    private Long id;

    @Column(
            name = "ent_type_name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String name;

    @Column(
            name = "ent_type_descr",
            columnDefinition = "TEXT"
    )
    private String descr;

    @Column(
            name = "ent_parent_id"
    )
    private Long entParentId;


    public EntityType() {

    }

    public EntityType(String name, String descr, Long entParentId) {
        this.name = name;
        this.descr = descr;
        this.entParentId = entParentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Long getEntParentId() {
        return entParentId;
    }

    public void setEntParentId(Long entParentId) {
        this.entParentId = entParentId;
    }
}