import React from 'react'

type ListingsTableProps = {
  jobs : Job[] | undefined,
}

const ListingsTable = ({jobs} : ListingsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {jobs?.map((job) => {
            return <tr key={job.id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {job.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                   </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListingsTable