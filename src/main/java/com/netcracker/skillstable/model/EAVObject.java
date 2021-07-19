package com.netcracker.skillstable.model;

import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.*;

@Entity(name="EAVObject")
@DynamicUpdate
@Table (name = "entities")
public class EAVObject {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(
            name = "ent_id",
            updatable = false,
            nullable = false,
            columnDefinition = "SERIAL"
    )
    private Integer id;

    @ManyToOne(targetEntity = EntityType.class)
    @JoinColumn(name = "ent_type_id")
    private EntityType entType;

    @Column(
            name = "ent_name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String entName;

    @OneToMany(mappedBy="eavObject", fetch=FetchType.LAZY, cascade=CascadeType.PERSIST, orphanRemoval = true)
    private List<Parameter> parameters = new ArrayList<>();


    public EAVObject() {

    }

    public EAVObject(String entName) {
        this.entName = entName;
    }

    public EAVObject(EntityType entType, String entName) {
        this.entType = entType;
        this.entName = entName;
    }

    public EAVObject(Integer id, EntityType entType, String entName) {
        this.id = id;
        this.entType = entType;
        this.entName = entName;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EntityType getEntType() {
        return entType;
    }

    public void setEntType(EntityType entType) {
        this.entType = entType;
    }

    public String getEntName() {
        return entName;
    }

    public void setEntName(String entName) {
        this.entName = entName;
    }

    public void addParameter(Parameter inputParam) {
        parameters.add(inputParam);
    }

    public void addParameters(List<Parameter> inputParams) {
        parameters.addAll(inputParams);
    }

    public List<Parameter> getParameters() {
        return parameters;
    }

    public Optional<ParameterValue> getParameterByAttrId(Integer attrId) {
        for (Parameter parameter : parameters) {
            if (attrId.equals(parameter.getAttribute().getId())) {
                return Optional.of(new ParameterValue(
                        parameter.getAttrValueInt(),
                        parameter.getAttrValueTxt()
                ));
            }
        }

        return Optional.empty();
    }

    public List<ParameterValue> getMultipleParametersByAttrId(Integer attrId) { // id exception?
        List<ParameterValue> listOfValues = new ArrayList<>();
        for (Parameter parameter : parameters) {
            if (attrId.equals(parameter.getAttribute().getId())) {
                listOfValues.add(new ParameterValue(
                        parameter.getAttrValueInt(),
                        parameter.getAttrValueTxt()
                ));
            }
        }

        return listOfValues;
    }

    public List<Parameter> updateParameters(List<Parameter> inputParams) {

        List<Parameter> newParameters = new ArrayList<>();

        for (Parameter inputParam : inputParams) {
            boolean contains = false;
            for (ListIterator<Parameter> iter = this.parameters.listIterator(); iter.hasNext(); ) {
                Parameter param = iter.next();
                if (inputParam.getAttribute().equals(param.getAttribute())) {
                    contains = true;
                    if (param.getAttribute().getMultiple()) {
                        newParameters.add(inputParam);
                    } else {
                        param.setAttrValueInt(inputParam.getAttrValueInt());
                        param.setAttrValueTxt(inputParam.getAttrValueTxt());
                        iter.set(param);
                    }

                    break;
                }
            }
            if (!contains) {
                newParameters.add(inputParam);
            }
        }

        return newParameters;
    }

    public void deleteParameter(Integer attrId) {
        parameters.removeIf(parameter -> attrId.equals(parameter.getAttribute().getId()));
    }

    @Override
    public String toString() {
        return "EAVObject{" +
                "id=" + id +
                ", entType=" + entType +
                ", entName='" + entName + '\'' +
                ", parameters=" + parameters +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EAVObject eavObject = (EAVObject) o;
        return id.equals(eavObject.id) && entType.equals(eavObject.entType) && Objects.equals(entName, eavObject.entName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, entType, entName);
    }


}
