import React from "react";
import styled from "styled-components/macro";

export default function InfoList({item}) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  return (
    <ComponentLayout>


      {item?.birthday !== undefined &&
        <ListItemStyled>
          <LabelStyled>Birthday:</LabelStyled>
          <div>{item?.birthday}</div>
        </ListItemStyled>
      }

      {item?.placeOfBirth !== undefined &&
        <ListItemStyled>
          <LabelStyled>Place of Birth:</LabelStyled>
          <div>{item?.placeOfBirth}</div>
        </ListItemStyled>
      }

      {item?.biography !== undefined &&
        <ListItemStyled>
          <LabelStyled>Biography:</LabelStyled>
          <div>{item?.biography}</div>
        </ListItemStyled>
      }

      {item?.releaseDate !== undefined &&
        <ListItemStyled>
          <LabelStyled>Release Date:</LabelStyled>
          <div>{item?.releaseDate}</div>
        </ListItemStyled>
      }

      {item?.originalLanguage !== undefined &&
        <ListItemStyled>
          <LabelStyled>Original Language:</LabelStyled>
          <div>{item?.originalLanguage}</div>
        </ListItemStyled>
      }

      {item?.runtime !== undefined &&
        <ListItemStyled>
          <LabelStyled>Runtime:</LabelStyled>
          <div>{item?.runtime}</div>
        </ListItemStyled>
      }

      {item?.budget !== undefined &&
        <ListItemStyled>
          <LabelStyled>Budget:</LabelStyled>
          <div>{formatter.format(item?.budget)}</div>
        </ListItemStyled>
      }

      {item?.revenue !== undefined &&
        <ListItemStyled>
          <LabelStyled>Revenue:</LabelStyled>
          <div>{formatter.format(item?.revenue)}</div>
        </ListItemStyled>
      }

      {item?.overview !== undefined &&
        <ListItemStyled>
          <LabelStyled>Overview:</LabelStyled>
          <div>{item?.overview}</div>
        </ListItemStyled>
      }

    </ComponentLayout>
  )
}

const ComponentLayout = styled.div`
  padding-top: 20px;
  padding-left: 5px;
  list-style: none;
  color: white;
`;

const ListItemStyled = styled.li`
  padding: 10px;
`;

const LabelStyled = styled.div`
  font-size: 1em;
  font-weight: bold;
`;