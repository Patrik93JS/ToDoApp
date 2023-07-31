"use client";

import { useCallback, useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { useGetAllToDosQuery, useGetToDosQuery } from "@/store/api/todoApi";
import { useMeQuery } from "@/store/api/authenticationApi";

export const useFilteredToDos = () => {
  const { idGroup } = useAppSelector(({ idGroupToDo }) => idGroupToDo);
  const { data } = useGetToDosQuery({ todoGroupId: idGroup }, { skip: !idGroup });
  const { data: meData } = useMeQuery();
  const { filter, searchValue } = useAppSelector(({ filter }) => filter);

  const meIdGroups = meData?.to_do_groups.map((group) => group.id);
  const { data: allData } = useGetAllToDosQuery({ todoGroupId: meIdGroups });

  const handleSearch = useCallback(() => {
    const filteredData = data?.data.filter((item) => item.attributes.title.includes(searchValue));
    return filteredData;
  }, [data?.data, searchValue]);

  const handleComplete = useCallback(() => {
    const completeData = data?.data.filter((item) => item.attributes.to_do_group.data?.id === idGroup && item.attributes.completed);
    return completeData;
  }, [data?.data, idGroup]);

  const handleIdGroup = useCallback(() => {
    const idGroupData = data?.data.filter(
      (item) => item.attributes.to_do_group?.data?.id === idGroup && item.attributes.to_do_group.data.id === idGroup
    );
    return idGroupData;
  }, [data?.data, idGroup]);

  const filteredTodos = useMemo(() => {
    if (filter === "complete") {
      return handleComplete();
    } else if (filter === "search") {
      return handleSearch();
    } else if (filter === "all") {
      return allData?.data;
    } else {
      return handleIdGroup();
    }
  }, [filter, handleComplete, handleSearch, allData?.data, handleIdGroup]);

  return { filteredTodos };
};
