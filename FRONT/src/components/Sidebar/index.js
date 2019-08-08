import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Label, Icon, Input } from 'semantic-ui-react';
import classNames from 'class-names';

import './sidebar.scss';


const Sidebar = ({ idOpenEvent, tags, categories }) => {

  // classNames //
  const withEvent = classNames({
    withEvent: idOpenEvent !== '',
  });
  const [categoriesLabel, setCategoriesLabel] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [actualsTags, setActualsTags] = useState([]);
  const [tagsFind, setTagsFind] = useState([]);
  const [tagsCards, setTagsCards] = useState([]);

  const createTags = () => {
    console.log(actualsTags);
    return setTagsCards(
      actualsTags.map(tag => ([
        <Label data={tag[0].id} key={tag.id}>
          {tag[0].title}
          <Icon name='delete' />
        </Label>,
      ])),
    );
  };

  const searchTag = (search) => {
    const searchLength = search.length;
    // Reg for select the same length string than the letter search
    if (searchLength !== 0) {
      const limited = new RegExp(search, 'gi');
      setTagsFind(
        tags
          .filter(tag => tag.title.match(limited))
          .map(tag => ([
            <div className="tagFind" onClick={clickHandlerNewTag}>
              <div className="name" value={tag.id}>{tag.title}</div>
            </div>,
            <hr/>,
          ])),
      );
    }
  };

  const changeSearchHandler = (evnt) => {
    evnt.persist();
    setTagsFind([]);
    searchTag(evnt.target.value);
  };

  const deleteInput = () => {
    const searchBar = document.querySelector('.searchBarTag');
    console.log(searchBar);
  }

  const clickHandlerNewTag = (evt) => {
    const idNewTags = evt.target.getAttribute('value');
    console.log (evt.target).closest('.searchBar');
    deleteInput();
    const newTags = tags.filter(tag => tag.id == idNewTags);
    return (setActualsTags([
      ...actualsTags,
      newTags,
    ]));
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    createTags();
  };

  let cat = [];
  const displayCategories = () => {
    if (categoriesArray !== []) {
      
      categoriesArray.forEach(categorie => { cat.push(
        <Form.Field key={categorie.title} control={Checkbox} label={<label>{categorie.title}</label>} />
      ) 
      setCategoriesLabel(cat);
    });
    }
  };

  useEffect(() => createTags(), [tags, actualsTags]);
  useEffect(() => setCategoriesArray(categories), [categories]);
  useEffect(() => displayCategories(), [categoriesArray]);
  

  return (
    <div className={`sidebar ${withEvent}`}>
      <div className="title">
        categories
      </div>
      <Form>
        <Form.Field control={Checkbox} label={<label>All</label>} />
        {categoriesLabel}
      </Form>
      <div className="tribeTag">
        <div className="title">
          Tribe
        </div>
        <div className="tags">
          <div className="searchBar">
            <div className="ui input">
              <Input placeholder='State' icon="search" id="searchBarTag" search selection onChange={changeSearchHandler} onSubmit={submitHandler} />
            </div>
            <div className="results">
              {tagsFind}
            </div>
          </div>
          {tagsCards}
        </div>
      </div>   
    </div>
  );
};

Sidebar.propTypes = {
  idOpenEvent: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

// == Export
export default Sidebar;
