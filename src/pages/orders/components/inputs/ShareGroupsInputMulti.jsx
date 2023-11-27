import React from 'react';
import { FormItem, FormList } from '../../../../components/Form';
import { Selector } from '../../../../components/primitives';

function ShareGroupsInputMulti({ groups, selectedGroups, multiselect = true }) {
    return (
        <FormList name="groupsMulti">
          {
            ()=>(
              <FormItem
                name={["selecteds", 'groupIds']}
                rules={[]}
                style={{ width: '100%', marginRigth: '2%', marginBottom: '2%' }}
              >
                  <Selector
                      mode={multiselect ? 'multiple' : ''}
                      data={groups}
                      placeholder="Selecciona multiples grupos (opcional)"
                      config={{ label: 'name', value: '_id' }}
                      onChange={() => groups}
                  />
              </FormItem>
            )
          }
        </FormList>
    );
}

export default ShareGroupsInputMulti;