import React from 'react';
import './emptyState.css';

interface Props {
  emptyType: null | undefined
}

const EmptyState: React.FC<Props> = ({ emptyType }: Props ) => {
    return (
        <div className='empty-state'>
            {
                emptyType === null ? (
                    <React.Fragment>
                        <h2>Player not found</h2>
                        <p>Please make a new search</p>
                    </React.Fragment>
                ) : (
                    <p>Make a search</p>
                )
            }
        </div>
    )
}

export default EmptyState;