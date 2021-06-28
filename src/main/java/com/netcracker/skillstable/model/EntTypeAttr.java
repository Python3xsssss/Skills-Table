package com.netcracker.skillstable.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="EntTypeAttr")
@Table (name = "entity_type_attr")
public class EntTypeAttr {
    @Id
    @Column(
            name = "id_pk",
            updatable = false,
            nullable = false,
            columnDefinition = "SERIAL"
    )
    private Long id;

    @ManyToOne(targetEntity = EntityType.class)
    @JoinColumn(name = "ent_type_id")
    private EntityType entityType;

    @ManyToOne(targetEntity = Attribute.class)
    @JoinColumn(name = "attr_id")
    private Attribute attribute;

    public EntTypeAttr() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EntityType getEntType() {
        return entityType;
    }

    public Attribute getAttribute() {
        return attribute;
    }
}
