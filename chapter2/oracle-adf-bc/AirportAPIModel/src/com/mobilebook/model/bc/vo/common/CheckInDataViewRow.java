package com.mobilebook.model.bc.vo.common;

import oracle.jbo.Row;
// ---------------------------------------------------------------------
// ---    File generated by Oracle ADF Business Components Design Time.
// ---    Wed May 09 20:37:30 CEST 2018
// ---------------------------------------------------------------------
public interface CheckInDataViewRow extends Row {
    void makeCheckIn(String hasCheckInLuggage);

    void makeCheckInUser();
}

