import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Label, Icon, Input } from 'semantic-ui-react';
import classNames from 'class-names';

import './sidebar.scss';


const Sidebar = ({ idOpenEvent, tags, categories, changeActiveCategories, activeCategories }) => {

  // classNames //
  const withEvent = classNames({
    withEvent: idOpenEvent !== '',
  });
  const [categoriesLabels, setCategoriesLabels] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState();
  const [actualsTags, setActualsTags] = useState([]);
  const [tagsFind, setTagsFind] = useState([]);
  const [tagsCards, setTagsCards] = useState([]);

  const createTags = () => {
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
  }

  const clickHandlerNewTag = (evt) => {
    const idNewTags = evt.target.getAttribute('value');
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

  const [all, setAll] = useState([{ title: 'All' }]);
  const [services, setServices] = useState([{ title: 'Services' }]);
  const [celebrations, setCelebrations] = useState([{ title: 'Célébrations' }]);
  const [anniversaires, setAnniversaires] = useState([{ title: 'Anniversaires' }]);
  const [repas, setRepas] = useState([{ title: 'Repas' }]);
  const [sorties, setSorties] = useState([{ title: 'Sorties' }]);
  const [chills, setChills] = useState([{ title: 'Chills' }]);
  const [autres, setAutres] = useState([{ title: 'Autres' }]);

  /// ALL /// 
  const active = () => {
    if (all.checked === true) {
      changeActiveCategories(all[0].title);
    }
    if (services.checked === true) {
      changeActiveCategories(services[0].title);
    }
    if (celebrations.checked === true) {
      changeActiveCategories(celebrations[0].title);
    }
    if (anniversaires.checked === true) {
      changeActiveCategories(anniversaires[0].title);
    }
    if (repas.checked === true) {
      changeActiveCategories(repas[0].title);
    }
    if (sorties.checked === true) {
      changeActiveCategories(sorties[0].title);
    }
    if (chills.checked === true) {
      changeActiveCategories(chills[0].title);
    }
    if (autres.checked === true) {
      changeActiveCategories(autres[0].title);
    }
  };
  const unCheckAll = () => {
    setAll({
      ...all,
      checked: false,
    });
    setServices({
      ...services,
      checked: false,
    });
    setCelebrations({
      ...celebrations,
      checked: false,
    });
    setAnniversaires({
      ...anniversaires,
      checked: false,
    });
    setRepas({
      ...repas,
      checked: false,
    });
    setSorties({
      ...sorties,
      checked: false,
    });
    setChills({
      ...chills,
      checked: false,
    });
    setAutres({
      ...autres,
      checked: false,
    });
  };

  const changeHandlerCheckAll = () => {
    if (all.length == 1) {
      unCheckAll();
      setAll({
        ...all,
        checked: !all.checked,
      });
    }
    if (all.checked == false) {
      unCheckAll();
      setAll({
        ...all,
        checked: !all.checked,
      });
    }
  };
  /// SERVICES /// 
  const changeHandlerCheckServices = () => {
    if (services.length == 1) {
      unCheckAll();
      setServices({
        ...services,
        checked: !services.checked,
      });
    }
    if (services.checked == false) {
      unCheckAll();
      setServices({
        ...services,
        checked: !services.checked,
      });
    }
  };
  /// CELEBRATIONS /// 
  const changeHandlerCheckCelebrations = () => {
    if (celebrations.length == 1) {
      unCheckAll();
      setCelebrations({
        ...celebrations,
        checked: !celebrations.checked,
      });
    }
    if (celebrations.checked == false) {
      unCheckAll();
      setCelebrations({
        ...celebrations,
        checked: !celebrations.checked,
      });
    }
  };
   /// ANNIVERSAIRES ///
  const changeHandlerCheckAnniversaires = () => {
    if (anniversaires.length == 1) {
      unCheckAll();
      setAnniversaires({
        ...anniversaires,
        checked: !anniversaires.checked,
      });
    }
    if (anniversaires.checked == false) {
      unCheckAll();
      setAnniversaires({
        ...anniversaires,
        checked: !anniversaires.checked,
      });
    }
  };
  /// REPAS ///
  const changeHandlerCheckRepas = () => {
    if (repas.length == 1) {
      unCheckAll();
      setRepas({
        ...repas,
        checked: !repas.checked,
      });
    }
    if (repas.checked == false) {
      unCheckAll();
      setRepas({
        ...repas,
        checked: !repas.checked,
      });
    }
  };
  /// SORTIES ///
  const changeHandlerCheckSorties = () => {
    if (sorties.length == 1) {
      unCheckAll();
      setSorties({
        ...sorties,
        checked: !sorties.checked,
      });
    }
    if (sorties.checked == false) {
      unCheckAll();
      setSorties({
        ...sorties,
        checked: !sorties.checked,
      });
    }
  };
  /// CHILLS ///
  const changeHandlerCheckChills = () => {
    if (chills.length == 1) {
      unCheckAll();
      setChills({
        ...chills,
        checked: !chills.checked,
      });
    }
    if (chills.checked == false) {
      unCheckAll();
      setChills({
        ...chills,
        checked: !chills.checked,
      });
    }
  };
   /// AUTRES ///
  const changeHandlerCheckAutres = () => {
    if (autres.length == 1) {
      unCheckAll();
      setAutres({
        ...autres,
        checked: !autres.checked,
      });
    }
    if (autres.checked == false) {
      unCheckAll();
      setAutres({
        ...autres,
        checked: !autres.checked,
      });
    }
  };

 

  const cat = [];
  const displayCategories = () => {
    if (categoriesArray !== undefined) {
      if (categoriesArray.length !== 0) {

        cat.push(
          <Form>
            <Checkbox label={{ children: 'All' }} className="categorie" checked={all.checked} value="all" onChange={changeHandlerCheckAll} />
            <Checkbox label={{ children: 'Services' }} className="categorie" checked={services.checked} value="all" onChange={changeHandlerCheckServices} style={{ backgroundColor: categoriesArray[0].color }} />
            <Checkbox label={{ children: 'Célébrations' }} className="categorie" checked={celebrations.checked} value="all" onChange={changeHandlerCheckCelebrations} style={{ backgroundColor: categoriesArray[1].color }} />
            <Checkbox label={{ children: 'Anniversaires' }} className="categorie" checked={anniversaires.checked} value="all" onChange={changeHandlerCheckAnniversaires} style={{ backgroundColor: categoriesArray[2].color }} />
            <Checkbox label={{ children: 'Repas' }} checked={repas.checked} className="categorie" value="all" onChange={changeHandlerCheckRepas} style={{ backgroundColor: categoriesArray[3].color }} />
            <Checkbox label={{ children: 'Sorties' }} checked={sorties.checked} className="categorie" value="all" onChange={changeHandlerCheckSorties} style={{ backgroundColor: categoriesArray[4].color }} />
            <Checkbox label={{ children: 'Chills' }} checked={chills.checked} className="categorie" value="all" onChange={changeHandlerCheckChills} style={{ backgroundColor: categoriesArray[5].color }} />
            <Checkbox label={{ children: 'Autres' }} checked={autres.checked} className="categorie" value="all" onChange={changeHandlerCheckAutres} style={{ backgroundColor: categoriesArray[6].color }} />
          </Form>,
        );
        setCategoriesLabels(cat);
      }
    }
  };

  useEffect(() => createTags(), [tags, actualsTags]);
  useEffect(() => setCategoriesArray(categories), [categories]);
  useEffect(() => displayCategories(), [categoriesArray, all, services, celebrations, anniversaires, chills, sorties, repas, autres]);
  useEffect(() => active(), [all, services, celebrations, anniversaires, chills, sorties, repas, autres]);
  useEffect(() => changeHandlerCheckAll(), []);


  return (
    <div className={`sidebar ${withEvent}`}>
      <div className="title">
        categories
      </div>
      {categoriesLabels}
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
  activeCategories: PropTypes.string.isRequired,
};

// == Export
export default Sidebar;
